import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from 'react-native-google-mobile-ads';

import React, {useMemo, useRef} from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../constants/colors';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {useSound} from '../hooks/useSound';
import {SOUNDS} from '../models/game';
import {useRevenueCat} from '../hooks/useRevenueCat';
import {useAppSelector} from '../hooks/useAppSelector';
import {useAppDispatch} from '../store';
import {incrementCoin, setPro} from '../store/slicers/user.slice';
import {getCollectorRewardPerHour} from '../utils/helpers';

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-5097211111237502/6618577682';

export const AdBanner = () => {
  const {play} = useSound();
  const insets = useSafeAreaInsets();
  const bannerRef = useRef<BannerAd>(null);
  const dispatch = useAppDispatch();
  const {currentLevel, premium_package} = useAppSelector(
    state => state.userData,
  );
  const {purchasePackage} = useRevenueCat();

  const premiumCoin = useMemo(() => {
    return getCollectorRewardPerHour(currentLevel) * 200;
  }, [currentLevel]);

  const handlePremiumPurchase = async () => {
    const result = await purchasePackage(premium_package!);
    if (result) {
      dispatch(setPro(true));
      dispatch(incrementCoin(premiumCoin));
      Alert.alert('Success', 'You are now a Premium user!');
    }
  };

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  const onPressIn = () => {
    play(SOUNDS.BUTTON_CLICK);
  };

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <TouchableOpacity
        style={styles.closeButtonContainer}
        activeOpacity={0.7}
        onPressIn={onPressIn}
        onPress={handlePremiumPurchase}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <FontAwesome6Icon name="xmark" size={24} color={colors.white} />
      </TouchableOpacity>
      <BannerAd
        ref={bannerRef}
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
  },
  closeButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 20,
    top: -28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
