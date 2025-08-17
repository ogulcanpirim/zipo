import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {EQText} from './EQText';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const {width} = Dimensions.get('window');

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
}

export const ProfileStatsCard = ({icon, value, label}: StatCardProps) => {
  return (
    <LinearGradient
      style={styles.statCard}
      colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <FontAwesome6
        name={icon}
        size={32}
        color={colors.white}
        style={styles.statIcon}
      />
      <EQText style={styles.statValue}>{value}</EQText>
      <EQText style={styles.statLabel}>{label}</EQText>
    </LinearGradient>
  );
};

export const styles = StyleSheet.create({
  statCard: {
    width: (width - 48) / 2,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.white,
    textAlign: 'center',
  },
});
