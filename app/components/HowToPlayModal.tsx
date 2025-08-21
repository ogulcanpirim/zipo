import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {EQText} from './EQText';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import Svg, {Path} from 'react-native-svg';
import {useAppSelector} from '../hooks/useAppSelector';

const GRID_SIZE = 3;
const GRID_ITEMS = Array.from({length: GRID_SIZE * GRID_SIZE}, (_, i) => i);

export const HowToPlayModal = () => {
  const pathColor = useAppSelector(state => state.userData.pathColor);

  const getGridCellStyle = (index: number): ViewStyle => {
    return {
      borderTopLeftRadius: index === 0 ? 8 : 0,
      borderTopRightRadius: index === 2 ? 8 : 0,
      borderBottomLeftRadius: index === 6 ? 8 : 0,
      borderBottomRightRadius: index === 8 ? 8 : 0,
    };
  };

  return (
    <View style={styles.modalContainer}>
      <EQText style={styles.modalTitle}>How to Play ?</EQText>
      <View style={styles.items}>
        <View style={styles.leftContainer}>
          <View style={styles.cells}>
            <View style={[styles.line, {backgroundColor: pathColor}]} />
            <View style={[styles.cell, {borderColor: pathColor}]}>
              <EQText style={styles.cellText}>1</EQText>
            </View>
            <View style={[styles.cell, {borderColor: pathColor}]}>
              <EQText style={styles.cellText}>2</EQText>
            </View>
            <View style={[styles.cell, {borderColor: pathColor}]}>
              <EQText style={styles.cellText}>3</EQText>
            </View>
          </View>
          <EQText style={styles.leftDesc} numberOfLines={2}>
            {'Connect the \ndots in order'}
          </EQText>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.gridBoard}>
            {GRID_ITEMS.map(item => (
              <View
                key={item}
                style={[styles.gridCell, getGridCellStyle(item)]}
              />
            ))}
            <Svg
              width={GRID_SIZE * 30}
              height={GRID_SIZE * 30}
              style={[styles.svgStyle, {shadowColor: pathColor}]}
              viewBox={`0 0 ${GRID_SIZE * 30} ${GRID_SIZE * 30}`}>
              <Path
                d="M15 17.5 L15 75 M15 75 L45 75 L45 17.5 L75 17.5 L75 75"
                fill="none"
                stroke={pathColor}
                strokeWidth={12}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
          <EQText style={styles.leftDesc} numberOfLines={2}>
            {'Fill every cell'}
          </EQText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: fonts.bold,
  },
  items: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  leftContainer: {
    gap: 10,
    alignItems: 'center',
    paddingTop: 20,
  },
  cells: {
    flexDirection: 'row',
    gap: 6,
    marginHorizontal: 20,
  },
  line: {
    position: 'absolute',
    top: 6,
    height: 20,
    left: -11,
    borderRadius: 10,
    width: 130,
  },
  cell: {
    backgroundColor: colors.black,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  cellText: {
    color: colors.white,
    fontFamily: fonts.bold,
  },
  leftDesc: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    textAlign: 'center',
  },
  gridBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: GRID_SIZE * 30,
    height: GRID_SIZE * 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridCell: {
    width: 30,
    height: 30,
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: colors.textGray,
    margin: 0,
  },
  rightContainer: {
    gap: 10,
    alignItems: 'center',
  },
  svgStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: GRID_SIZE * 30,
    height: GRID_SIZE * 30,
  },
});
