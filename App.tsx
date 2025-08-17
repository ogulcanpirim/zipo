import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import AppNavigationContainer from './app/navigation/AppNavigation';
import store from './app/store';
import LoaderProvider from './app/providers/LoaderProvider';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <Provider store={store}>
        <LoaderProvider>
          <AppNavigationContainer />
        </LoaderProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
