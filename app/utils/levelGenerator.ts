import {WALL_SIDE} from '../constants/enums';

export interface NumberedCell {
  row: number;
  col: number;
  number: number;
}

export interface Wall {
  cell1: [number, number];
  cell2: [number, number];
}

export interface Level {
  gridSize: number;
  numberedCells: NumberedCell[];
  difficulty: 'easy' | 'medium' | 'hard';
  solutionPath: Array<[number, number]>;
  seed: number;
  walls: Wall[];
}

type DifficultyConfig = {
  gridSize: number;
  minDotCount: number;
  maxDotCount: number;
  minSpacing: number;
  retryAttempts: number;
  wallCount: number;
  wallProbability: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

const DIFFICULTY_CONFIGS: Record<'easy' | 'medium' | 'hard', DifficultyConfig> =
  {
    easy: {
      gridSize: 6,
      minDotCount: 3,
      maxDotCount: 7,
      minSpacing: 2,
      retryAttempts: 100,
      wallCount: 4, // Maximum possible walls for easy mode
      wallProbability: 0.2, // 20% chance per potential wall location
      difficulty: 'easy',
    },
    medium: {
      gridSize: 8,
      minDotCount: 4,
      maxDotCount: 8,
      minSpacing: 4,
      retryAttempts: 100,
      wallCount: 9,
      wallProbability: 0.4,
      difficulty: 'medium',
    },
    hard: {
      gridSize: 10,
      minDotCount: 7,
      maxDotCount: 7,
      minSpacing: 8,
      retryAttempts: 100,
      wallCount: 16,
      wallProbability: 0.5,
      difficulty: 'hard',
    },
  };

class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// utils
// ────────────────────────────────────────────────────────────────────────────
const key = ([r, c]: [number, number]) => `${r},${c}`;

const shuffleInPlace = <T>(arr: T[], rnd: SeededRandom) => {
  for (let i = arr.length - 1; i > 0; --i) {
    const j = rnd.nextInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getUnvisitedNeighbors = (
  current: [number, number],
  gridSize: number,
  visited: Set<string>,
  walls: Wall[] = [],
  preferredDirection?: 'horizontal' | 'vertical',
): Array<[number, number]> => {
  const [row, col] = current;
  const neighbors: Array<[number, number]> = [];

  // Order directions based on preference
  let directions: Array<[number, number]> = [
    [-1, 0], // top
    [1, 0], // bottom
    [0, -1], // left
    [0, 1], // right
  ];
  if (preferredDirection === 'horizontal') {
    directions = [
      [0, -1], // left
      [0, 1], // right
      [-1, 0], // top
      [1, 0], // bottom
    ]; // prefer horizontal movement
  } else if (preferredDirection === 'vertical') {
    directions = [
      [-1, 0], // top
      [1, 0], // bottom
      [0, -1], // left
      [0, 1], // right
    ]; // prefer vertical movement
  }

  const hasWallBetween = (
    cell1: [number, number],
    cell2: [number, number],
  ): boolean => {
    return walls.some(
      wall =>
        (wall.cell1[0] === cell1[0] &&
          wall.cell1[1] === cell1[1] &&
          wall.cell2[0] === cell2[0] &&
          wall.cell2[1] === cell2[1]) ||
        (wall.cell1[0] === cell2[0] &&
          wall.cell1[1] === cell2[1] &&
          wall.cell2[0] === cell1[0] &&
          wall.cell2[1] === cell1[1]),
    );
  };

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (
      newRow >= 0 &&
      newRow < gridSize &&
      newCol >= 0 &&
      newCol < gridSize &&
      !visited.has(`${newRow},${newCol}`) &&
      !hasWallBetween([row, col], [newRow, newCol])
    ) {
      neighbors.push([newRow, newCol]);
    }
  }

  return neighbors;
};

// ────────────────────────────────────────────────────────────────────────────
// Hamiltonian path (depth-first with optimized Warnsdorff heuristic)
// ────────────────────────────────────────────────────────────────────────────
const generateHamiltonianPath = (
  gridSize: number,
  rnd: SeededRandom,
  maxRetries: number = 1000,
): Array<[number, number]> | null => {
  const total = gridSize * gridSize;
  const visited = new Set<string>();
  const neighborCounts = new Map<string, number>();

  const getNeighborCount = (pos: [number, number]): number => {
    const posKey = key(pos);
    if (!neighborCounts.has(posKey)) {
      neighborCounts.set(
        posKey,
        getUnvisitedNeighbors(pos, gridSize, visited, []).length,
      );
    }
    return neighborCounts.get(posKey)!;
  };

  const clearNeighborCache = (pos: [number, number]) => {
    const [row, col] = pos;
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (
        newRow >= 0 &&
        newRow < gridSize &&
        newCol >= 0 &&
        newCol < gridSize
      ) {
        neighborCounts.delete(key([newRow, newCol]));
      }
    }
    neighborCounts.delete(key(pos));
  };

  const start: [number, number] = [
    rnd.nextInt(0, gridSize - 1),
    rnd.nextInt(0, gridSize - 1),
  ];
  const path: Array<[number, number]> = [start];
  visited.add(key(start));

  let retries = 0;

  const dfs = (current: [number, number]): boolean => {
    if (retries >= maxRetries) return false;
    if (path.length === total) return true;

    const neighbors = getUnvisitedNeighbors(current, gridSize, visited, []);

    // Early pruning: if no neighbors and path not complete, backtrack
    if (neighbors.length === 0 && path.length < total) {
      return false;
    }

    // Sort neighbors by Warnsdorff's rule (fewest onward moves first)
    // Break ties randomly to avoid getting stuck in local patterns
    shuffleInPlace(neighbors, rnd);
    neighbors.sort((a, b) => {
      const countDiff = getNeighborCount(a) - getNeighborCount(b);
      return countDiff === 0 ? rnd.next() - 0.5 : countDiff;
    });

    for (const nxt of neighbors) {
      visited.add(key(nxt));
      path.push(nxt);
      clearNeighborCache(nxt); // Clear cache for affected cells

      if (dfs(nxt)) return true;

      // Backtrack
      path.pop();
      visited.delete(key(nxt));
      clearNeighborCache(nxt); // Clear cache after backtracking
      retries++;
    }

    return false;
  };

  const result = dfs(start);
  return result ? path : null;
};

// ────────────────────────────────────────────────────────────────────────────
// generateLevel – retry loop fixed, uniqueness enforced
// ────────────────────────────────────────────────────────────────────────────
const generateWalls = (
  gridSize: number,
  solutionPath: Array<[number, number]>,
  numberedCells: NumberedCell[],
  config: DifficultyConfig,
  rnd: SeededRandom,
): Wall[] => {
  const walls: Wall[] = [];
  const solutionPathSet = new Set(solutionPath.map(([r, c]) => `${r},${c}`));
  const numberedCellsSet = new Set(
    numberedCells.map(cell => `${cell.row},${cell.col}`),
  );

  // Helper to check if a wall would block the solution path
  const wouldBlockSolution = (
    cell1: [number, number],
    cell2: [number, number],
  ): boolean => {
    // Check if both cells are in the solution path and are consecutive
    const cell1Key = `${cell1[0]},${cell1[1]}`;
    const cell2Key = `${cell2[0]},${cell2[1]}`;
    if (!solutionPathSet.has(cell1Key) || !solutionPathSet.has(cell2Key)) {
      return false;
    }

    // Find positions in solution path
    const pos1 = solutionPath.findIndex(
      ([r, c]) => r === cell1[0] && c === cell1[1],
    );
    const pos2 = solutionPath.findIndex(
      ([r, c]) => r === cell2[0] && c === cell2[1],
    );

    // Check if they are consecutive in the solution path
    return Math.abs(pos1 - pos2) === 1;
  };

  // Helper to check if a wall would block a numbered cell
  const wouldBlockNumberedCell = (
    cell1: [number, number],
    cell2: [number, number],
  ): boolean => {
    return (
      numberedCellsSet.has(`${cell1[0]},${cell1[1]}`) ||
      numberedCellsSet.has(`${cell2[0]},${cell2[1]}`)
    );
  };

  // Try to place walls
  let attempts = 0;
  const maxAttempts = gridSize * gridSize * 4;

  while (walls.length < config.wallCount && attempts < maxAttempts) {
    attempts++;

    // Skip wall placement based on probability (only for easy difficulty)
    if (config.difficulty === 'easy' && rnd.next() > config.wallProbability) {
      continue;
    }

    // Randomly select a cell
    const row = rnd.nextInt(0, gridSize - 1);
    const col = rnd.nextInt(0, gridSize - 1);

    // Randomly choose wall direction (0: horizontal, 1: vertical)
    const direction = rnd.nextInt(0, 2);

    if (direction < 1 && col < gridSize - 1) {
      // Right wall
      const cell1: [number, number] = [row, col];
      const cell2: [number, number] = [row, col + 1];

      if (
        !wouldBlockSolution(cell1, cell2) &&
        !wouldBlockNumberedCell(cell1, cell2)
      ) {
        const wall = {cell1, cell2};
        // Check if wall already exists
        if (
          !walls.some(
            w =>
              (w.cell1[0] === wall.cell1[0] &&
                w.cell1[1] === wall.cell1[1] &&
                w.cell2[0] === wall.cell2[0] &&
                w.cell2[1] === wall.cell2[1]) ||
              (w.cell1[0] === wall.cell2[0] &&
                w.cell1[1] === wall.cell2[1] &&
                w.cell2[0] === wall.cell1[0] &&
                w.cell2[1] === wall.cell1[1]),
          )
        ) {
          walls.push(wall);
        }
      }
    } else if (direction >= 1 && row < gridSize - 1) {
      // Bottom wall
      const cell1: [number, number] = [row, col];
      const cell2: [number, number] = [row + 1, col];

      if (
        !wouldBlockSolution(cell1, cell2) &&
        !wouldBlockNumberedCell(cell1, cell2)
      ) {
        const wall = {cell1, cell2};
        // Check if wall already exists
        if (
          !walls.some(
            w =>
              (w.cell1[0] === wall.cell1[0] &&
                w.cell1[1] === wall.cell1[1] &&
                w.cell2[0] === wall.cell2[0] &&
                w.cell2[1] === wall.cell2[1]) ||
              (w.cell1[0] === wall.cell2[0] &&
                w.cell1[1] === wall.cell2[1] &&
                w.cell2[0] === wall.cell1[0] &&
                w.cell2[1] === wall.cell1[1]),
          )
        ) {
          walls.push(wall);
        }
      }
    }
  }

  return walls;
};

export const generateLevel = (
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  seed?: number,
  maxAttempts: number = 5,
): Level => {
  const cfg = DIFFICULTY_CONFIGS[difficulty];
  let realSeed = seed ?? Date.now();
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const rnd = new SeededRandom(realSeed);
      const path = generateHamiltonianPath(cfg.gridSize, rnd, 1000);

      if (!path) {
        attempts++;
        realSeed = Date.now(); // Use a new seed for the next attempt
        continue;
      }

      // Generate random number of dots between min and max
      const dotCount = rnd.nextInt(cfg.minDotCount, cfg.maxDotCount);

      // Calculate spacing between numbers
      const spacing = Math.floor((path.length - 1) / (dotCount - 1));

      // Create evenly spaced numbered cells, ensuring the last one is at the end
      const numberedPath = Array.from(
        {length: dotCount - 1},
        (_, i) => path[i * spacing],
      ).concat([path[path.length - 1]]);

      const numberedCells = numberedPath.map(([r, c], i) => ({
        row: r,
        col: c,
        number: i + 1,
      }));

      // Generate walls
      const walls = generateWalls(cfg.gridSize, path, numberedCells, cfg, rnd);

      return {
        gridSize: cfg.gridSize,
        numberedCells,
        solutionPath: path,
        difficulty,
        seed: realSeed,
        walls,
      };
    } catch (error) {
      attempts++;
      realSeed = Date.now(); // Use a new seed for the next attempt

      if (attempts >= maxAttempts) {
        throw new Error(
          `Failed to generate level after ${maxAttempts} attempts`,
        );
      }
    }
  }

  throw new Error(`Failed to generate level after ${maxAttempts} attempts`);
};

export const generateDailyLevel = (): Level => {
  const today = new Date();
  const seed =
    today.getDate() + today.getMonth() * 31 + today.getFullYear() * 365;
  return generateLevel('easy', seed); // Start with easy for daily levels
};

export const generateRandomLevel = (
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
): Level => {
  return generateLevel(difficulty);
};

export const formatLevel = (level: Level) => {
  const numbers: Array<[number, number, number]> = level.numberedCells.map(
    cell => [cell.row, cell.col, cell.number],
  );
  let walls: Array<[number, number, number]> = [];
  for (const wall of level.walls) {
    const [row1, col1] = wall.cell1;
    const [row2, col2] = wall.cell2;
    if (row1 === row2) {
      if (col1 < col2) {
        walls.push([row1, col1, WALL_SIDE.RIGHT]);
        walls.push([row2, col2, WALL_SIDE.LEFT]);
      } else {
        walls.push([row1, col1, WALL_SIDE.LEFT]);
        walls.push([row2, col2, WALL_SIDE.RIGHT]);
      }
    } else if (col1 === col2) {
      if (row1 < row2) {
        walls.push([row1, col1, WALL_SIDE.BOTTOM]);
        walls.push([row2, col2, WALL_SIDE.TOP]);
      } else {
        walls.push([row1, col1, WALL_SIDE.TOP]);
        walls.push([row2, col2, WALL_SIDE.BOTTOM]);
      }
    }
  }
  return {
    gridSize: level.gridSize,
    numbers,
    difficulty: level.difficulty,
    solutionPath: level.solutionPath,
    seed: level.seed,
    walls,
  };
};

export const getDifficulty = (
  currentLevel: number,
): 'easy' | 'medium' | 'hard' => {
  if (currentLevel < 20) {
    return 'easy';
  } else if (currentLevel < 40) {
    return 'medium';
  } else {
    return 'hard';
  }
};
