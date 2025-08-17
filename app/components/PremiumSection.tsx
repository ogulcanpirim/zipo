import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {EQText} from './EQText';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import LinearGradient from 'react-native-linear-gradient';
import {PremiumModal} from './PremiumModal';
import {useBottomSheet} from '../hooks/useBottomsheet';

export const PremiumSection = () => {
  const {expand} = useBottomSheet();
  const openPremiumModal = () => {
    expand({
      content: <PremiumModal />,
      snapPoints: ['90%'],
      enablePanDownToClose: true,
      pressBehavior: 'close',
    });
  };

  return (
    <View style={styles.premiumContainer}>
      <LinearGradient
        style={styles.premiumBanner}
        colors={[colors.yellow, colors.orange]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.crownContainer}>
          <FontAwesome6Icon
            name="crown"
            size={32}
            color={colors.white}
            style={styles.gameModeIcon}
          />
          <EQText style={styles.premiumTitle}>Upgrade to Premium!</EQText>
          <EQText style={styles.premiumSubtitle}>
            Remove ads, unlock exclusive features
          </EQText>
          <TouchableOpacity
            style={styles.premiumButton}
            onPress={openPremiumModal}>
            <EQText style={styles.premiumButtonText}>Go Premium</EQText>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  premiumContainer: {
    width: '100%',
    marginTop: 20,
  },
  premiumBanner: {
    borderRadius: 12,
    paddingTop: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.yellow,
  },
  crownContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  premiumTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  premiumSubtitle: {
    color: colors.white,
    textAlign: 'center',
  },
  premiumButton: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  premiumButtonText: {
    fontSize: 13,
    fontFamily: fonts.semiBold,
    color: colors.orange,
  },
  gameModeIcon: {
    marginBottom: 12,
  },
});
