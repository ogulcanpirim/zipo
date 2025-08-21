export interface Level {
  id: number;
  gridSize: number;
  difficulty: string;
  numbers: Array<[number, number, number]>;
  walls: Array<[number, number, number]>;
  solutionPath: Array<[number, number]>;
}

export enum ELevelDifficulty {
  BABY = 'baby',
  CHILD = 'child',
  EASY = 'easy',
  NORMAL = 'normal',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum WALL_SIDE {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

export interface LevelGroup {
  id: number;
  title: string;
  startLevel: number;
  endLevel: number;
  difficulty: string;
  coinReward: number;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export enum SOUNDS {
  BUTTON_CLICK = 'click.wav',
  SUCCESS = 'success.wav',
  ERROR = 'error.mp3',
  PURCHASE = 'purchase.wav',
}

export interface PathTheme {
  id: number;
  name: string;
  color: string;
  price: number;
  unlocked: boolean;
  description: string;
}

export interface LevelSection {
  title: string;
  data: Level[];
}
