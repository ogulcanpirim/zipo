import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CoinWrap} from '../components/CoinWrap';
import {EQText} from '../components/EQText';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppNavigation} from '../hooks/useAppNavigation';
import {useAppSelector} from '../hooks/useAppSelector';
import {SCREENS} from '../navigation/screens';
import {useAppDispatch} from '../store';
import {incrementLevel} from '../store/slicers/user.slice';
import {formatCoinCount, getCurrentLevel} from '../utils/helpers';
import {Pressable} from '../components/Pressable';
import {SOUNDS} from '../models/game';
import {useSound} from '../hooks/useSound';
import LinearGradient from 'react-native-linear-gradient';
import CoinSvg from '../components/CoinSvg';

export const GameFinishScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const route =
    useRoute<RouteProp<{params: {imageUri: string; rewardCoin: number}}>>();
  const pathColor = useAppSelector(state => state.userData.pathColor);
  const {play} = useSound();

  const currentLevel = useAppSelector(state => state.userData.currentLevel);

  const onPressIn = () => {
    play(SOUNDS.BUTTON_CLICK);
  };

  const handleClose = () => {
    dispatch(incrementLevel());
    navigation.goBack();
  };

  const handleNextLevel = () => {
    dispatch(incrementLevel());
    const level = getCurrentLevel();
    navigation.navigate(SCREENS.GAME, {level});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
            {`Level ${currentLevel + 1} Unlocked`}
          </EQText>
          <View style={styles.earnedCoinContainer}>
            <EQText style={styles.collectPlus}>+</EQText>
            <CoinSvg width={14} height={14} />
            <EQText style={styles.collectText}>
              {formatCoinCount(route.params?.rewardCoin)}
            </EQText>
          </View>
        </Animated.View>
        <Animated.View
          style={styles.imageContainer}
          entering={FadeIn.delay(400)}>
          <Image source={{uri: route.params?.imageUri}} style={styles.image} />
        </Animated.View>
        <Animated.View style={styles.buttons} entering={FadeIn.delay(500)}>
          <Pressable
            sound={SOUNDS.BUTTON_CLICK}
            onPress={handleNextLevel}
            style={styles.addPressable}>
            <LinearGradient
              colors={['#FF6B35', '#E55A2B']}
              style={styles.adButton}>
              <EQText style={styles.costText}>Collect</EQText>
              <CoinSvg width={14} height={14} />
              <EQText style={styles.costText}>
                {formatCoinCount(route.params?.rewardCoin * 2)}
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
          <Pressable
            style={styles.buttonContainer}
            sound={SOUNDS.BUTTON_CLICK}
            onPress={handleNextLevel}>
            <EQText style={styles.buttonText}>Next Level</EQText>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 32,
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
    paddingTop: 10,
  },
  earnedCoinContainer: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
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
