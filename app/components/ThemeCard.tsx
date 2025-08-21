import React, {memo, useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {EQText} from './EQText';
import {Pressable} from './Pressable';
import CoinSvg from './CoinSvg';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {formatCoinCount} from '../utils/helpers';
import {SOUNDS} from '../models/game';
import {useAppSelector} from '../hooks/useAppSelector';

interface ThemeCardProps {
  themeName: string;
  themeColor: string;
  themeDescription: string;
  price: number;
  unlocked: boolean;
  isEquipped: boolean;
  onEquip: () => void;
  onPurchase: () => void;
}

const cells = Array.from({length: 5}, (_, i) => i);
const GRID_SIZE = 5;

const ThemeCardComponent = ({
  themeName,
  themeColor,
  themeDescription,
  price,
  unlocked,
  isEquipped = false,
  onEquip,
  onPurchase,
}: ThemeCardProps) => {
  const coin = useAppSelector(state => state.userData.coin);

  const disabled = useMemo(() => {
    return coin < price && !unlocked;
  }, [coin, price, unlocked]);

  const renderActionButton = () => {
    if (!unlocked) {
      return (
        <Pressable
          disabled={disabled}
          onPress={onPurchase}
          style={styles.newBlur}>
          <View style={styles.buttonContent}>
            <CoinSvg width={16} height={16} />
            <EQText style={styles.buttonText}>{formatCoinCount(price)}</EQText>
          </View>
        </Pressable>
      );
    }

    if (isEquipped) {
      return (
        <View style={styles.newEquippedButton}>
          <View style={styles.equippedContent}>
            <FontAwesome6 name="check" size={14} color={colors.white} />
            <EQText style={styles.equippedText}>Equipped</EQText>
          </View>
        </View>
      );
    }

    return (
      <Pressable
        style={[styles.actionButton, styles.equipButton]}
        sound={SOUNDS.BUTTON_CLICK}
        onPress={onEquip}>
        <LinearGradient
          style={styles.buttonGradient}
          colors={[`${themeColor}80`, `${themeColor}60`]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <EQText style={styles.buttonText}>Equip</EQText>
        </LinearGradient>
      </Pressable>
    );
  };

  return (
    <View style={[disabled && styles.disabled]}>
      <LinearGradient
        style={[
          styles.themeGradient,
          {borderColor: isEquipped ? `${colors.white}75` : `${themeColor}25`},
        ]}
        colors={[`${themeColor}30`, colors.darkCard]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.cellContainer}>
          {cells.map(cell => {
            const cellStyle: ViewStyle = {
              borderTopLeftRadius: cell === 0 ? 8 : 0,
              borderBottomLeftRadius: cell === 0 ? 8 : 0,
              borderTopRightRadius: cell === 4 ? 8 : 0,
              borderBottomRightRadius: cell === 4 ? 8 : 0,
              backgroundColor: `${themeColor}60`,
            };
            return <View style={[styles.cellStyle, cellStyle]} key={cell} />;
          })}
          <Svg
            width={GRID_SIZE * 50}
            height={GRID_SIZE * 50}
            style={[styles.path, {shadowColor: themeColor}]}
            viewBox={`0 0 ${GRID_SIZE * 50} ${GRID_SIZE * 50}`}>
            <Path
              d="M25 25 L225 25"
              fill="none"
              stroke={themeColor}
              strokeWidth={20}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
        <View style={styles.themeInfo}>
          <View style={styles.themeTextContainer}>
            <EQText style={styles.themeName}>{themeName}</EQText>
            <EQText style={styles.themeDescription}>{themeDescription}</EQText>
          </View>
          {renderActionButton()}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  themeGradient: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  cellContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  cellStyle: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  path: {
    position: 'absolute',
    shadowOpacity: 0.8,
    shadowRadius: 16,
  },
  themeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  themeTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  themeName: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.white,
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },
  actionButton: {
    borderRadius: 8,
  },
  purchaseBlur: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  equipButton: {
    borderRadius: 8,
  },
  equippedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newEquippedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  buttonGradient: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  equippedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  equippedText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  newBlur: {
    backgroundColor: 'rgba(0,0,0, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

export const ThemeCard = memo(ThemeCardComponent);
