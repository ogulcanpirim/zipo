import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {CoinWrap} from '../components/CoinWrap';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppNavigation} from '../hooks/useAppNavigation';
import {useSound} from '../hooks/useSound';
import {SOUNDS} from '../models/game';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
}

export const Header = ({title, onBackPress}: HeaderProps) => {
  const navigation = useAppNavigation();
  const {play} = useSound();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    navigation.goBack();
  };

  const onPressIn = () => {
    play(SOUNDS.BUTTON_CLICK);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPressIn={onPressIn}
        onPress={handleBackPress}
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
        <FontAwesome6Icon name="chevron-left" size={18} color={colors.white} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.coinWrapper}>
        <CoinWrap />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 15,
    backgroundColor: colors.darkBackground,
  },
  backButton: {
    position: 'absolute',
    left: 25,
    bottom: 18,
  },
  title: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
  coinWrapper: {
    position: 'absolute',
    right: 20,
    bottom: 16,
  },
});
