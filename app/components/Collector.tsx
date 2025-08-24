import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {ZoomIn, ZoomOut} from 'react-native-reanimated';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useModal} from '../hooks/useModal';
import {SOUNDS} from '../models/game';
import {formatCoinCount} from '../utils/helpers';
import CoinSvg from './CoinSvg';
import {CoinWrap} from './CoinWrap';
import {EQText} from './EQText';
import {Pressable} from './Pressable';
import {TimerSvg} from './TimerSvg';

export const Collector = () => {
  const {close} = useModal();

  const earnedCoin = 12400;
  const handleClose = () => {
    close();
  };
  return (
    <Animated.View
      style={styles.modalContainer}
      entering={ZoomIn.duration(200)}
      exiting={ZoomOut.duration(200)}>
      <View style={styles.icon}>
        <TimerSvg width={60} height={60} />
      </View>
      <EQText style={styles.headerTitle}>Collector</EQText>
      <Pressable
        style={styles.closeButton}
        sound={SOUNDS.BUTTON_CLICK}
        onPress={handleClose}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <View style={styles.closeContainer}>
          <FontAwesome6Icon name="xmark" size={20} color={colors.white} />
        </View>
      </Pressable>
      <View style={styles.content}>
        <View style={styles.coinWrapper}>
          <CoinWrap text={`${formatCoinCount(12400)}/hour`} />
        </View>
        <EQText style={styles.idleTime}>{'Idle time: 5 hours'}</EQText>
        <EQText style={styles.idleDesc}>Max Idle income: 8 hours</EQText>
        <View style={styles.progressContainer}>
          <View style={styles.progress} />
        </View>
        <View style={styles.buttons}>
          <Pressable
            sound={SOUNDS.BUTTON_CLICK}
            onPress={() => {}}
            style={styles.addPressable}>
            <LinearGradient
              colors={['#A8FF78', '#009245']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.adButton}>
              <EQText style={styles.costText}>{'Collect'}</EQText>
              <CoinSvg width={14} height={14} />
              <EQText style={styles.costText}>
                {formatCoinCount(earnedCoin * 2)}
              </EQText>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.darkCard,
    borderRadius: 20,
    width: 320,
    paddingBottom: 40,
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    padding: 32,
  },
  icon: {
    position: 'absolute',
    top: -36,
    alignSelf: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.semiBold,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: -8,
    top: -16,
  },
  closeContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    borderRadius: 10,
  },
  content: {
    alignItems: 'center',
    paddingTop: 12,
  },
  coinWrapper: {
    paddingLeft: 12,
    marginBottom: 12,
  },
  idleTime: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    textAlign: 'center',
  },
  idleDesc: {
    color: colors.white,
    fontFamily: fonts.regular,
    textAlign: 'center',
    opacity: 0.8,
  },
  progressContainer: {
    marginTop: 12,
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.darkBorder,
  },
  progress: {
    height: '100%',
    width: '40%',
    borderRadius: 4,
    backgroundColor: colors.yellow,
  },
  buttons: {
    width: '100%',
    paddingTop: 20,
  },
  addPressable: {
    borderRadius: 12,
  },
  adButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 2,
    borderRadius: 12,
    gap: 6,
  },
  adButtonText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  collectText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  costText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.white,
  },
});
