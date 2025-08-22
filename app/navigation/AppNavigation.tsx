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
export const navigationRef = createNavigationContainerRef<ParamListBase>();

const AppNavigationContainer = () => {
  const onNavigationReady = () => {
    BootSplash.hide();
  };
  return (
    <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
      <BottomSheetProvider>
        <SystemBars style="light" />
        <GeneralStack />
      </BottomSheetProvider>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
