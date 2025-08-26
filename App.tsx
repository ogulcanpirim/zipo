import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AnimatedBootsplashContainer from './app/containers/AnimatedBootsplash';
import AppNavigationContainer from './app/navigation/AppNavigation';
import LoaderProvider from './app/providers/LoaderProvider';
import redux from './app/store';
import {configureReanimatedLogger} from 'react-native-reanimated';
import mobileAds from 'react-native-google-mobile-ads';

configureReanimatedLogger({strict: false});

mobileAds().initialize();

const App = () => {
  const [visible, setVisible] = useState(true);

  const hideBootsplash = () => {
    setVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.flex}>
      <Provider store={redux.store}>
        <PersistGate persistor={redux.persistor} loading={null}>
          <LoaderProvider>
            <AppNavigationContainer />
          </LoaderProvider>
        </PersistGate>
      </Provider>
      {visible && (
        <AnimatedBootsplashContainer onAnimationEnd={hideBootsplash} />
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
