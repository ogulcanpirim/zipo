import {
  createNavigationContainerRef,
  NavigationContainer,
  ParamListBase,
} from '@react-navigation/native';
import React from 'react';
import {SystemBars} from 'react-native-edge-to-edge';

import {GeneralStack} from './GeneralStack';
import {BottomSheetProvider} from '../providers/BottomsheetProvider';
export const navigationRef = createNavigationContainerRef<ParamListBase>();

const AppNavigationContainer = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <BottomSheetProvider>
        <SystemBars style="light" />
        <GeneralStack />
      </BottomSheetProvider>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
