import {FlashList} from '@shopify/flash-list';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../components/Header';
import {LevelEntranceBlock} from '../components/LevelEntranceBlock';
import {colors} from '../constants/colors';
import {useAppNavigation} from '../hooks/useAppNavigation';
import {useAppSelector} from '../hooks/useAppSelector';
import {LevelGroup} from '../models/game';
import {SCREENS} from '../navigation/screens';

export const LevelEntranceScreen = () => {
  const navigation = useAppNavigation();
  const {currentLevel} = useAppSelector(state => state.userData);

  const levelGroups: LevelGroup[] = [
    {
      id: 1,
      title: 'Baby Steps',
      startLevel: 1,
      endLevel: 100,
      difficulty: '4x4',
      coinReward: 500,
      isUnlocked: true,
      isCompleted: currentLevel > 100,
    },
    {
      id: 2,
      title: "Child's Play",
      startLevel: 101,
      endLevel: 200,
      difficulty: '4x4',
      coinReward: 750,
      isUnlocked: currentLevel > 100,
      isCompleted: currentLevel > 200,
    },
    {
      id: 3,
      title: 'Teen Challenge',
      startLevel: 201,
      endLevel: 300,
      difficulty: '5x5',
      coinReward: 1000,
      isUnlocked: currentLevel > 200,
      isCompleted: currentLevel > 300,
    },
    {
      id: 4,
      title: 'Adult Mastery',
      startLevel: 301,
      endLevel: 400,
      difficulty: '5x5',
      coinReward: 1250,
      isUnlocked: currentLevel > 300,
      isCompleted: currentLevel > 400,
    },
    {
      id: 5,
      title: 'Expert Level',
      startLevel: 401,
      endLevel: 500,
      difficulty: '6x6',
      coinReward: 1500,
      isUnlocked: currentLevel > 400,
      isCompleted: currentLevel > 500,
    },
    {
      id: 6,
      title: 'Master Level',
      startLevel: 501,
      endLevel: 600,
      difficulty: '6x6',
      coinReward: 1750,
      isUnlocked: currentLevel > 500,
      isCompleted: currentLevel > 600,
    },
    {
      id: 7,
      title: 'Grandmaster',
      startLevel: 601,
      endLevel: 700,
      difficulty: '6x6',
      coinReward: 2000,
      isUnlocked: currentLevel > 600,
      isCompleted: currentLevel > 700,
    },
    {
      id: 8,
      title: 'Legendary',
      startLevel: 701,
      endLevel: 800,
      difficulty: '7x7',
      coinReward: 2250,
      isUnlocked: currentLevel > 700,
      isCompleted: currentLevel > 800,
    },
    {
      id: 9,
      title: 'Mythic',
      startLevel: 801,
      endLevel: 900,
      difficulty: '7x7',
      coinReward: 2500,
      isUnlocked: currentLevel > 800,
      isCompleted: currentLevel > 900,
    },
    {
      id: 10,
      title: 'Divine',
      startLevel: 901,
      endLevel: 1000,
      difficulty: '8x8',
      coinReward: 2750,
      isUnlocked: currentLevel > 900,
      isCompleted: currentLevel > 1000,
    },
    {
      id: 11,
      title: 'Transcendent',
      startLevel: 1001,
      endLevel: 1100,
      difficulty: '8x8',
      coinReward: 3000,
      isUnlocked: currentLevel > 1000,
      isCompleted: currentLevel > 1100,
    },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleLevelGroupPress = useCallback(
    (group: LevelGroup) => {
      if (group.isUnlocked) {
        navigation.navigate(SCREENS.LEVELS, {
          groupId: group.id,
          startLevel: group.startLevel,
          endLevel: group.endLevel,
          title: group.title,
        });
      }
    },
    [navigation],
  );

  const renderLevelGroup = useCallback(
    ({item}: {item: LevelGroup}) => (
      <LevelEntranceBlock
        item={item}
        currentLevel={currentLevel}
        handleLevelGroupPress={handleLevelGroupPress}
      />
    ),
    [currentLevel, handleLevelGroupPress],
  );

  return (
    <View style={styles.container}>
      <Header title="Levels" onBackPress={handleBackPress} />
      <FlashList
        data={levelGroups}
        renderItem={renderLevelGroup}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        estimatedItemSize={120}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 100,
    paddingTop: 24,
  },
});
