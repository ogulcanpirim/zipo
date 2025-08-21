import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import AppNavigationContainer from './app/navigation/AppNavigation';
import redux from './app/store';
import LoaderProvider from './app/providers/LoaderProvider';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <Provider store={redux.store}>
        <PersistGate persistor={redux.persistor} loading={null}>
          <LoaderProvider>
            <AppNavigationContainer />
          </LoaderProvider>
        </PersistGate>
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
