import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DashboardScreen} from '../screens/dashboard';
import {DevModeScreen} from '../screens/devMode';
import {GameScreen} from '../screens/game';
import {GameFinishScreen} from '../screens/gameFinish';
import {LevelEntranceScreen} from '../screens/levelEntrance';
import {LevelsScreen} from '../screens/levels';
import {MarketplaceScreen} from '../screens/marketplace';
import {ThemesScreen} from '../screens/themes';
import {SCREENS} from './screens';
import {DEV_MODE_ENABLED} from '../constants/game';

const Stack = createNativeStackNavigator();

export const GeneralStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.DASHBOARD} component={DashboardScreen} />
      <Stack.Screen name={SCREENS.GAME} component={GameScreen} />
      <Stack.Screen name={SCREENS.MARKETPLACE} component={MarketplaceScreen} />
      <Stack.Screen name={SCREENS.LEVELS} component={LevelsScreen} />
      <Stack.Screen
        name={SCREENS.LEVEL_ENTRANCE}
        component={LevelEntranceScreen}
      />
      <Stack.Screen
        name={SCREENS.GAME_FINISH}
        component={GameFinishScreen}
        options={{
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen name={SCREENS.THEMES} component={ThemesScreen} />
      {DEV_MODE_ENABLED && (
        <Stack.Screen name={SCREENS.DEV_MODE} component={DevModeScreen} />
      )}
    </Stack.Navigator>
  );
};
