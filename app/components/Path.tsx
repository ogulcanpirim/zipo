import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path as SvgPath,
} from 'react-native-svg';
import {colors} from '../constants/colors';
import {useAppSelector} from '../hooks/useAppSelector';
import {useAppDispatch} from '../store';
import {setDraggedCells} from '../store/slicers/user.slice';

export interface PathHandle {
  updatePathData: (path: string) => void;
  updateReduxPath: () => void;
  undo: (moveCount: number) => void;
  clearPath: () => void;
}

interface PathProps {
  size: number;
  cellSize: number;
}

const PathComponent = forwardRef<PathHandle, PathProps>(
  ({size, cellSize}, ref) => {
    const dispatch = useAppDispatch();
    const pathColor = useAppSelector(state => state.userData.pathColor);
    const [moves, setMoves] = useState<string[]>([]);
    const pathDataState = moves.length > 0 ? moves[moves.length - 1] : '';

    const updatePathData = (path: string) => {
      setMoves(prevMoves => [...prevMoves, path]);
    };

    const undo = useCallback((moveCount: number) => {
      setMoves(prevMoves => prevMoves.slice(0, -moveCount));
    }, []);

    const updateReduxPath = useCallback(() => {
      dispatch(setDraggedCells(moves));
    }, [dispatch, moves]);

    useImperativeHandle(
      ref,
      () => ({
        updatePathData,
        updateReduxPath,
        undo,
        clearPath: () => setMoves([]),
      }),
      [undo, updateReduxPath],
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
      shadowColor: pathColor,
      shadowOpacity: 0.8,
      shadowRadius: 16,
    };

    return (
      <Svg style={svgStyle} width={size * cellSize} height={size * cellSize}>
        <Defs>
          <LinearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={pathColor} stopOpacity={0.8} />
            <Stop offset="50%" stopColor={colors.white} stopOpacity={1} />
            <Stop offset="100%" stopColor={pathColor} stopOpacity={0.8} />
          </LinearGradient>
        </Defs>
        <SvgPath
          d={pathDataState}
          //stroke="url(#pathGradient)"
          stroke={pathColor}
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
