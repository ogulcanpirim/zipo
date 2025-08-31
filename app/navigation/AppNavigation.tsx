import {
  createNavigationContainerRef,
  NavigationContainer,
  ParamListBase,
} from '@react-navigation/native';
import React from 'react';
import BootSplash from 'react-native-bootsplash';
import {SystemBars} from 'react-native-edge-to-edge';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetProvider} from '../providers/BottomsheetProvider';
import {ModalProvider} from '../providers/ModalProvider';
import {GeneralStack} from './GeneralStack';

export const navigationRef = createNavigationContainerRef<ParamListBase>();

const AppNavigationContainer = () => {
  const onNavigationReady = () => {
    BootSplash.hide();
  };
  return (
    <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
      <SafeAreaProvider>
        <BottomSheetProvider>
          <ModalProvider>
            <SystemBars style="light" />
            <GeneralStack />
          </ModalProvider>
        </BottomSheetProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
