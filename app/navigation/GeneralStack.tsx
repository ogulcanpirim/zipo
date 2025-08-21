import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AchievementsScreen} from '../screens/achievements';
import {DashboardScreen} from '../screens/dashboard';
import {GameScreen} from '../screens/game';
import {GameFinishScreen} from '../screens/gameFinish';
import {LeaderboardScreen} from '../screens/leaderboard';
import {LevelEntranceScreen} from '../screens/levelEntrance';
import {LevelsScreen} from '../screens/levels';
import {MarketplaceScreen} from '../screens/marketplace';
import {ProfileScreen} from '../screens/profile';
import {ThemesScreen} from '../screens/themes';
import {SCREENS} from './screens';

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
    </Stack.Navigator>
  );
};
