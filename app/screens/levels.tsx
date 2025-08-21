import {RouteProp, useRoute} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import CoinSvg from '../components/CoinSvg';
import {EQText} from '../components/EQText';
import {Header} from '../components/Header';
import {LevelBlock} from '../components/LevelBlock';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppNavigation} from '../hooks/useAppNavigation';
import {useAppSelector} from '../hooks/useAppSelector';
import {Level} from '../models/game';
import {SCREENS} from '../navigation/screens';
import {getLevelData} from '../utils/helpers';

interface LevelSection {
  title: string;
  data: Level[];
}

interface RouteParams {
  groupId: number;
  title: string;
}

export const LevelsScreen = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<{params: RouteParams}>>();
  const {currentLevel} = useAppSelector(state => state.userData);

  const levelSections: LevelSection[] = useMemo(() => {
    const levelsData = getLevelData(route.params.groupId) as Level[];
    return [
      {
        title: `Level ${levelsData[0].id} - Level ${levelsData[24].id}`,
        data: levelsData.slice(0, 25),
      },
      {
        title: `Level ${levelsData[25].id} - Level ${levelsData[49].id}`,
        data: levelsData.slice(25, 50),
      },
      {
        title: `Level ${levelsData[50].id} - Level ${levelsData[74].id}`,
        data: levelsData.slice(50, 75),
      },
      {
        title: `Level ${levelsData[75].id} - Level ${levelsData[99].id}`,
        data: levelsData.slice(75, 100),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params.groupId, currentLevel]);

  const handleLevelPress = useCallback(
    (level: Level) => {
      navigation.navigate(SCREENS.GAME, {level: level});
    },
    [navigation],
  );

  const isSectionBlocked = useCallback(
    (section: LevelSection) => {
      return section.data.every(level => level.id > currentLevel);
    },
    [currentLevel],
  );

  const renderSectionHeader = useCallback(
    ({section}: {section: LevelSection}) => {
      const startLevel = section.data[0].id;
      const coinReward =
        startLevel <= 100
          ? 500
          : startLevel <= 400
          ? 750
          : startLevel <= 800
          ? 1000
          : 1250;
      // Determine if section is blocked
      const sectionBlocked = isSectionBlocked(section);
      return (
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <EQText style={styles.sectionTitle}>{section.title}</EQText>
            <View
              style={[
                styles.sectionCoinBadge,
                sectionBlocked && styles.sectionCoinBadgeDisabled,
              ]}>
              <CoinSvg width={14} height={14} />
              <EQText style={styles.sectionCoinText}>{coinReward}</EQText>
            </View>
          </View>
          <View style={styles.sectionDivider} />
        </View>
      );
    },
    [isSectionBlocked],
  );

  const renderSection = useCallback(
    ({item}: {item: LevelSection}) => {
      return (
        <View style={styles.section}>
          {renderSectionHeader({section: item})}
          <View style={styles.levelsGrid}>
            {item.data.map(level => {
              const isCurrentLevel = level.id === currentLevel;
              const isBlocked = level.id > currentLevel;
              const isCompleted = level.id < currentLevel;
              return (
                <LevelBlock
                  key={level.id}
                  level={level}
                  isCurrentLevel={isCurrentLevel}
                  isBlocked={isBlocked}
                  isCompleted={isCompleted}
                  onPress={handleLevelPress}
                />
              );
            })}
          </View>
        </View>
      );
    },
    [renderSectionHeader, currentLevel, handleLevelPress],
  );

  return (
    <View style={styles.container}>
      <Header title={route.params.title} />
      <FlashList
        data={levelSections}
        renderItem={renderSection}
        keyExtractor={section => section.title}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        estimatedItemSize={400}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.darkBackground,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.white,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  coinWrapper: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.medium,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
    textAlign: 'left',
  },
  sectionCoinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.white}30`,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
  },
  sectionCoinBadgeDisabled: {
    opacity: 0.4,
  },
  sectionCoinText: {
    fontFamily: fonts.bold,
    color: colors.white,
    marginLeft: 4,
  },
  sectionDivider: {
    height: 2,
    backgroundColor: colors.white,
    borderRadius: 1,
    opacity: 0.3,
  },
  levelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 2,
  },
});
