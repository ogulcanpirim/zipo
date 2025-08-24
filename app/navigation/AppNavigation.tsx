import {
  createNavigationContainerRef,
  NavigationContainer,
  ParamListBase,
} from '@react-navigation/native';
import React from 'react';
import {SystemBars} from 'react-native-edge-to-edge';
import BootSplash from 'react-native-bootsplash';

import {GeneralStack} from './GeneralStack';
import {BottomSheetProvider} from '../providers/BottomsheetProvider';
import {ModalProvider} from '../providers/ModalProvider';
export const navigationRef = createNavigationContainerRef<ParamListBase>();

const AppNavigationContainer = () => {
  const onNavigationReady = () => {
    BootSplash.hide();
  };
  return (
    <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
      <BottomSheetProvider>
        <ModalProvider>
          <SystemBars style="light" />
          <GeneralStack />
        </ModalProvider>
      </BottomSheetProvider>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
