import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {ZoomIn, ZoomOut} from 'react-native-reanimated';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useSound} from '../hooks/useSound';
import {SOUNDS} from '../models/game';
import {EQText} from './EQText';

export const GameFinishModal = () => {
  const {play} = useSound();

  const handleClose = () => {
    play(SOUNDS.BUTTON_CLICK);
  };

  return (
    <Animated.View
      style={styles.modalContainer}
      entering={ZoomIn}
      exiting={ZoomOut}>
      <EQText style={styles.headerTitle}>Congratulations</EQText>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={handleClose}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <FontAwesome6Icon name="xmark" size={24} color={colors.white} />
      </TouchableOpacity>
      <Image
        source={require('../assets/images/trophy.png')}
        style={styles.image}
      />
      <EQText style={styles.description}>You have completed all levels!</EQText>
      <EQText style={styles.description}>
        We are working on a new feature for infinite levels. Stay tuned!
      </EQText>
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
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.semiBold,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  description: {
    color: colors.white,
    fontFamily: fonts.regular,
    textAlign: 'center',
    opacity: 0.8,
  },
});
