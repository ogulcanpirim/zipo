import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  memo,
  useCallback,
} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path as SvgPath,
} from 'react-native-svg';
import {BOARD_COLOR, colors} from '../constants/colors';

export interface PathHandle {
  updatePathData: (path: string) => void;
  undo: (moveCount: number) => void;
  clearPath: () => void;
}

interface PathProps {
  size: number;
  cellSize: number;
}

const PathComponent = forwardRef<PathHandle, PathProps>(
  ({size, cellSize}, ref) => {
    const [moves, setMoves] = useState<string[]>([]);
    const pathDataState = moves.length > 0 ? moves[moves.length - 1] : '';

    console.log('pathDataState', pathDataState);

    const updatePathData = (path: string) => {
      setMoves(prevMoves => [...prevMoves, path]);
    };

    const undo = useCallback((moveCount: number) => {
      setMoves(prevMoves => prevMoves.slice(0, -moveCount));
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        updatePathData,
        undo,
        clearPath: () => setMoves([]),
      }),
      [undo],
    );

    if (!pathDataState || pathDataState === '') {
      return null;
    }

    const svgStyle: StyleProp<ViewStyle> = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: size * cellSize,
      height: size * cellSize,
      shadowColor: BOARD_COLOR,
      shadowOpacity: 0.8,
      shadowRadius: 16,
    };

    return (
      <Svg style={svgStyle} width={size * cellSize} height={size * cellSize}>
        <Defs>
          <LinearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={BOARD_COLOR} stopOpacity={0.8} />
            <Stop offset="50%" stopColor={colors.white} stopOpacity={1} />
            <Stop offset="100%" stopColor={BOARD_COLOR} stopOpacity={0.8} />
          </LinearGradient>
        </Defs>
        <SvgPath
          d={pathDataState}
          stroke={BOARD_COLOR}
          strokeWidth={cellSize * 0.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={1}
        />
      </Svg>
    );
  },
);

export const Path = memo(PathComponent);
