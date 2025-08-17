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
import {EQText} from '../components/EQText';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppSelector} from '../hooks/useAppSelector';
import {CoinWrap} from '../components/CoinWrap';
import {useRoute} from '@react-navigation/native';

export const GameFinishScreen = () => {
  const route = useRoute<any>();

  const currentLevel = useAppSelector(state => state.userData.currentLevel);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <CoinWrap />
        <TouchableOpacity style={styles.cancelContainer}>
          <FontAwesome6Icon name="xmark" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Animated.View
          entering={FadeIn.delay(300).duration(500)}
          style={styles.animatedTextContainer}>
          <EQText style={styles.title}>Congratulations!</EQText>
          <EQText style={styles.levelUnlockedText}>
            {`Level ${currentLevel + 1} Unlocked`}
          </EQText>
        </Animated.View>
        <Animated.View
          style={styles.imageContainer}
          entering={FadeIn.delay(500).duration(500)}>
          <Image source={{uri: route.params?.imageUri}} style={styles.image} />
        </Animated.View>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
          <EQText style={styles.buttonText}>Collect</EQText>
        </TouchableOpacity>
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
    paddingTop: 30,
    paddingHorizontal: 32,
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
    color: colors.premiumOrange,
    paddingTop: 10,
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
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: colors.darkBorder,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
});
