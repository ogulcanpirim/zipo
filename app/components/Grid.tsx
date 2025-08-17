import React from 'react';
import {Cell} from './Cell';
import {SharedValue} from 'react-native-reanimated';

interface GridProps {
  size: number;
  numbers: number[][];
  walls: Array<[number, number, number]>;
  cellSize: number;
  draggedCells: SharedValue<string[]>;
  cellWalls: Array<[number, number, number]>;
}

const GridComponent = ({
  size,
  numbers,
  walls,
  draggedCells,
  cellSize,
}: GridProps) => {
  return (
    <>
      {Array.from({length: size}).flatMap((_, row) =>
        Array.from({length: size}).map((__, col) => {
          const numberData = numbers.find(([x, y]) => x === row && y === col);
          const cellWalls = walls.filter(([r, c]) => r === row && c === col);
          return (
            <Cell
              key={`${row}-${col}`}
              size={size}
              row={row}
              col={col}
              cellNumber={numberData ? numberData[2] : undefined}
              activeCells={draggedCells}
              cellWalls={cellWalls}
              cellSize={cellSize}
            />
          );
        }),
      )}
    </>
  );
};

export const Grid = React.memo(GridComponent);
