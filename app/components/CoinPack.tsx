import React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet, View} from 'react-native';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {SOUNDS} from '../models/game';
import CoinSvg from './CoinSvg';
import {EQText} from './EQText';
import {Pressable} from './Pressable';
import LinearGradient from 'react-native-linear-gradient';
import { formatCoinCount } from '../utils/helpers';

interface CoinPackProps {
  id: number;
  coinAmount: number;
  bonusAmount: number;
  price: number;
}

// Helper to darken a hex color by a given percent
function darken(hex: string, percent: number): string {
  // Remove hash if present
  hex = hex.replace(/^#/, '');
  // Parse r,g,b
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));

  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export const CoinPack = ({
  id,
  coinAmount,
  bonusAmount,
  price,
}: CoinPackProps) => {
  const getGradientColors = (containerId: number): string[] => {
    switch (containerId) {
      case 1: {
        const top = '#7a5a00';
        const bottom = darken('#ffe08a', 0.18);
        return [bottom, top];
      }
      case 2: {
        const top = '#00594e';
        const bottom = darken('#6fffe2', 0.18);
        return [bottom, top];
      }
      case 3: {
        const top = '#a34e00';
        const bottom = darken('#ffd6a0', 0.18);
        return [bottom, top];
      }
      case 4: {
        const top = '#a0003d';
        const bottom = darken('#ffb3c9', 0.18);
        return [bottom, top];
      }
      default: {
        const top = '#7a5a00';
        const bottom = darken('#ffe08a', 0.18);
        return [bottom, top];
      }
    }
  };

  const extraImageStyle = (imageId: number): StyleProp<ImageStyle> => {
    switch (imageId) {
      case 1:
        return {transform: [{scale: 1.1}]};
      case 2:
        return {transform: [{scale: 0.9}]};
      case 3:
        return {transform: [{scale: 1.3}]};
      case 4:
        return {transform: [{scale: 1.5}]};
      default:
        return {transform: [{scale: 1.0}]};
    }
  };

  const getCoinPackImage = () => {
    switch (id) {
      case 1:
        return require('../assets/images/coin_pack_1.png');
      case 2:
        return require('../assets/images/coin_pack_2.png');
      case 3:
        return require('../assets/images/coin_pack_3.png');
      case 4:
        return require('../assets/images/coin_pack_4.png');
      default:
        return require('../assets/images/coin_pack_1.png');
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors(id)}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={getCoinPackImage()}
          style={[styles.image, extraImageStyle(id)]}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.coinRaw}>
          <CoinSvg width={14} height={14} />
          <EQText style={styles.coinText}>{formatCoinCount(coinAmount)}</EQText>
        </View>
        {bonusAmount > 0 && (
          <EQText style={styles.bonusText}>+{bonusAmount} Bonus</EQText>
        )}
      </View>
      <Pressable
        sound={SOUNDS.BUTTON_CLICK}
        style={styles.priceButton}
        onPress={() => {}}>
        <LinearGradient
          colors={['#A8FF78', darken('#009245', 0.2)]}
          start={{x: 0, y: 0}}
          style={styles.proButtonGradient}
          end={{x: 0, y: 1}}>
          <EQText style={styles.priceText}>₺{price}</EQText>
        </LinearGradient>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: `${colors.white}30`,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden', // to ensure gradient corners are rounded
  },
  imageContainer: {
    width: 60,
    height: 60,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  infoContainer: {
    gap: 2,
    paddingLeft: 12,
  },
  coinRaw: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  coinText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  bonusText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.white,
    opacity: 0.8,
  },
  priceText: {
    fontFamily: fonts.bold,
    color: colors.white,
  },
  priceButton: {
    marginLeft: 'auto',
    borderRadius: 8,
    padding: 12,
    overflow: 'hidden',
  },
  proButtonGradient: {
    padding: 8,
    borderRadius: 8,
  },
  animatedLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
    shadowColor: 'white',
    shadowOpacity: 0.8,
    shadowRadius: 16,
    width: 12,
    height: 100,
    left: -50,
  },
  animatedLineSecond: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
    shadowColor: 'white',
    shadowOpacity: 0.8,
    shadowRadius: 32,
    width: 12,
    height: 100,
    left: -35,
  },
});
