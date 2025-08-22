import React, {useState} from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {useUser} from '../hooks/useUser';

interface AnimatedBootsplashContainerProps {
  onAnimationEnd: () => void;
}

const AnimatedBootsplashContainer = ({
  onAnimationEnd,
}: AnimatedBootsplashContainerProps) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateY] = useState(() => new Animated.Value(0));
  const {updateUser} = useUser();
  const {container, logo} = BootSplash.useHideAnimation({
    manifest: require('../../assets/bootsplash/manifest.json'),
    logo: require('../../assets/bootsplash/logo.png'),
    statusBarTranslucent: true,
    navigationBarTranslucent: false,
    animate: async () => {
      await updateUser();
      const {height} = Dimensions.get('window');
      Animated.stagger(250, [
        Animated.spring(translateY, {
          useNativeDriver: true,
          toValue: -50,
        }),
        Animated.spring(translateY, {
          useNativeDriver: true,
          toValue: height,
        }),
      ]).start();

      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 150,
        delay: 350,
      }).start(() => {
        onAnimationEnd();
      });
    },
  });

  return (
    <Animated.View {...container} style={[container.style, {opacity}]}>
      <Animated.Image
        {...logo}
        style={[logo.style, styles.overrideLogo, {transform: [{translateY}]}]}
      />
    </Animated.View>
  );
};

export default AnimatedBootsplashContainer;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overrideLogo: {
    borderRadius: 12,
  },
});
