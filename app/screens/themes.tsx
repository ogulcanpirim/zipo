import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {EQText} from '../components/EQText';
import {Header} from '../components/Header';
import {ThemeCard} from '../components/ThemeCard';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {Theme} from '../constants/themes';
import {useAppSelector} from '../hooks/useAppSelector';
import {useAppDispatch} from '../store';
import {buyTheme, setSelectedTheme} from '../store/slicers/user.slice';
import {useSound} from '../hooks/useSound';
import {SOUNDS} from '../models/game';

export const ThemesScreen = () => {
  const dispatch = useAppDispatch();
  const {pathThemes, selectedTheme} = useAppSelector(state => state.userData);
  const {play} = useSound();

  const handleThemeEquip = (themeId: number) => {
    dispatch(setSelectedTheme(themeId));
  };

  const handleThemePurchase = (themeId: number) => {
    play(SOUNDS.PURCHASE);
    dispatch(buyTheme(themeId));
  };

  const renderThemeCard = (theme: Theme) => {
    return (
      <View key={theme.id} style={styles.themeCardContainer}>
        <ThemeCard
          themeColor={theme.color}
          themeName={theme.name}
          themeDescription={theme.description}
          price={theme.price}
          unlocked={theme.unlocked}
          isEquipped={selectedTheme === theme.id}
          onEquip={() => handleThemeEquip(theme.id)}
          onPurchase={() => handleThemePurchase(theme.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Themes" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.introSection}>
          <EQText style={styles.introTitle}>Customize Your Path</EQText>
          <EQText style={styles.introSubtitle}>
            Choose from a variety of beautiful path themes to make your game
            unique
          </EQText>
        </View>
        <View style={styles.themesGrid}>{pathThemes.map(renderThemeCard)}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  introSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  introTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  introSubtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
  },
  themesGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  themeCardContainer: {
    width: '100%',
  },
});
