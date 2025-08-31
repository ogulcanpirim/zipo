import {RouteProp, StackActions, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CoinSvg from '../components/CoinSvg';
import {CoinWrap} from '../components/CoinWrap';
import {EQText} from '../components/EQText';
import {Pressable} from '../components/Pressable';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppNavigation} from '../hooks/useAppNavigation';
import {useAppSelector} from '../hooks/useAppSelector';
import {useSound} from '../hooks/useSound';
import {SOUNDS} from '../models/game';
import {SCREENS} from '../navigation/screens';
import {useAppDispatch} from '../store';
import {incrementCoin, incrementLevel} from '../store/slicers/user.slice';
import {formatCoinCount, getCurrentLevel} from '../utils/helpers';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import {MAX_LEVEL} from '../constants/game';
import ConfettiCannon from 'react-native-confetti-cannon';
import {useModal} from '../hooks/useModal';
import {GameFinishModal} from '../components/GameFinishModal';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-5097211111237502/3093415584';

const rewarded = RewardedAd.createForAdRequest(adUnitId);

export const GameFinishScreen = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const route = useRoute<
    RouteProp<{
      params: {imageUri: string; rewardCoin: number; level_id?: number};
    }>
  >();
  const pathColor = useAppSelector(state => state.userData.pathColor);
  const {play} = useSound();
  const [loaded, setLoaded] = useState(false);
  const [rewardEarned, setRewardEarned] = useState(false);
  const earnedCoin = route.params?.rewardCoin ?? 0;

  const {currentLevel, gameFinished, ads_enabled} = useAppSelector(
    state => state.userData,
  );
  const maxLevelReached = currentLevel >= MAX_LEVEL;
  const levelAlreadyCompleted = route.params?.level_id
    ? currentLevel > route.params.level_id || gameFinished
    : false;

  const {expand} = useModal();

  useEffect(() => {
    if (currentLevel === MAX_LEVEL && !gameFinished) {
      expand({content: <GameFinishModal />});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressDoubleCoin = () => {
    if (!loaded) {
      return;
    }
    rewarded.show();
  };

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        setRewardEarned(true);
        dispatch(incrementCoin(earnedCoin * 2));
      },
    );
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressIn = () => {
    play(SOUNDS.BUTTON_CLICK);
  };

  const handleClose = () => {
    if (levelAlreadyCompleted) {
      navigation.dispatch(StackActions.pop(2));
      return;
    }
    dispatch(incrementLevel());
    navigation.goBack();
  };

  const handleNextLevel = () => {
    dispatch(incrementLevel());
    const level = getCurrentLevel();
    navigation.navigate(SCREENS.GAME, {level});
  };

  return (
    <View style={[styles.safeArea, {paddingTop: insets.top}]}>
      <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
      <View style={styles.header}>
        <CoinWrap />
        <TouchableOpacity
          onPressIn={onPressIn}
          style={styles.cancelContainer}
          onPress={handleClose}>
          <FontAwesome6Icon name="xmark" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Animated.View
          entering={FadeIn.delay(300)}
          style={styles.animatedTextContainer}>
          <EQText style={styles.title}>Congratulations!</EQText>
          <EQText style={[styles.levelUnlockedText, {color: pathColor}]}>
            {levelAlreadyCompleted || maxLevelReached
              ? `Level ${route.params?.level_id}`
              : `Level ${currentLevel + 1} Unlocked`}
          </EQText>
          {!levelAlreadyCompleted && (
            <View style={styles.earnedCoinContainer}>
              <EQText style={styles.collectPlus}>+</EQText>
              <CoinSvg width={14} height={14} />
              <EQText style={styles.collectText}>
                {formatCoinCount(route.params?.rewardCoin)}
              </EQText>
            </View>
          )}
        </Animated.View>
        <Animated.View
          style={styles.imageContainer}
          entering={FadeIn.delay(400)}>
          <Image
            source={{uri: route.params?.imageUri}}
            resizeMethod="scale"
            style={styles.image}
          />
        </Animated.View>
        <Animated.View style={styles.buttons} entering={FadeIn.delay(500)}>
          {levelAlreadyCompleted ? (
            <Pressable
              sound={SOUNDS.BUTTON_CLICK}
              onPress={handleClose}
              style={styles.buttonContainer}>
              <EQText style={styles.buttonText}>Close</EQText>
            </Pressable>
          ) : (
            !gameFinished &&
            ads_enabled && (
              <Pressable
                sound={SOUNDS.BUTTON_CLICK}
                onPress={onPressDoubleCoin}
                style={[styles.addPressable, rewardEarned && styles.disabled]}>
                <LinearGradient
                  colors={['#FF6B35', '#8E3201']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={styles.adButton}>
                  <EQText style={styles.costText}>
                    {rewardEarned ? 'Earned' : 'Collect'}
                  </EQText>
                  <CoinSvg width={14} height={14} />
                  <EQText style={styles.costText}>
                    {formatCoinCount(earnedCoin * 2)}
                  </EQText>
                </LinearGradient>
                <View style={styles.watchAdContainer}>
                  <MaterialIcons
                    name="video-collection"
                    size={22}
                    color={colors.white}
                  />
                </View>
              </Pressable>
            )
          )}
          {!levelAlreadyCompleted && (
            <Pressable
              style={[
                styles.buttonContainer,
                maxLevelReached && styles.disabled,
              ]}
              sound={SOUNDS.BUTTON_CLICK}
              disabled={maxLevelReached}
              onPress={handleNextLevel}>
              <EQText style={styles.buttonText}>Next Level</EQText>
            </Pressable>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  levelUnlockedText: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    paddingTop: 4,
  },
  earnedCoinContainer: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.white}90`,
    alignItems: 'center',
  },
  collectPlus: {
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  animatedTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelContainer: {
    zIndex: 1,
  },
  imageContainer: {
    width: 350,
    height: 350,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttons: {
    gap: 12,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 32,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: colors.darkBorder,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  addPressable: {
    flex: 1,
    borderRadius: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  adButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
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
  watchAdContainer: {
    position: 'absolute',
    right: -10,
    top: -12,
    padding: 4,
  },
});
