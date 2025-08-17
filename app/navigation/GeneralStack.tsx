import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREENS} from './screens';
import {DashboardScreen} from '../screens/dashboard';
import {ProfileScreen} from '../screens/profile';
import {LeaderboardScreen} from '../screens/leaderboard';
import {GameScreen} from '../screens/game';
import {AchievementsScreen} from '../screens/achievements';
import {MarketplaceScreen} from '../screens/marketplace';
import {LevelsScreen} from '../screens/levels';
import {GameFinishScreen} from '../screens/gameFinish';

const Stack = createNativeStackNavigator();

export const GeneralStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.DASHBOARD} component={DashboardScreen} />
      <Stack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={SCREENS.LEADERBOARD} component={LeaderboardScreen} />
      <Stack.Screen
        name={SCREENS.ACHIEVEMENTS}
        component={AchievementsScreen}
      />
      <Stack.Screen name={SCREENS.GAME} component={GameScreen} />
      <Stack.Screen name={SCREENS.MARKETPLACE} component={MarketplaceScreen} />
      <Stack.Screen name={SCREENS.LEVELS} component={LevelsScreen} />
      <Stack.Screen name={SCREENS.GAME_FINISH} component={GameFinishScreen} />
    </Stack.Navigator>
  );
};
