import {StyleSheet, TextInput, View} from 'react-native';
import {colors} from '../constants/colors';
import React, {useEffect} from 'react';
import {Header} from '../components/Header';
import {useAppSelector} from '../hooks/useAppSelector';
import {EQText} from '../components/EQText';
import {fonts} from '../constants/fonts';
import {useAppDispatch} from '../store';
import {clearData, setCoin, setCurrentLevel} from '../store/slicers/user.slice';
import {Pressable} from '../components/Pressable';
import {SOUNDS} from '../models/game';

export const DevModeScreen = () => {
  const dispatch = useAppDispatch();
  const {currentLevel, coin: currentCoin} = useAppSelector(
    state => state.userData,
  );
  const [level, setLevel] = React.useState('');
  const [coin, setNewCoin] = React.useState('');

  useEffect(() => {
    setLevel(currentLevel.toString());
    setNewCoin(currentCoin.toString());
  }, [currentLevel, currentCoin]);

  const handleReset = () => {
    dispatch(clearData());
  };

  const handleSave = () => {
    if (parseInt(level, 10) <= 1100 && parseInt(coin, 10) > 0) {
      dispatch(setCurrentLevel(parseInt(level, 10)));
      dispatch(setCoin(parseInt(coin, 10)));
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Dev Mode" />
      <View style={styles.content}>
        <EQText style={styles.header}>Level</EQText>
        <TextInput
          style={styles.input}
          placeholder="Level"
          value={level.toString()}
          keyboardType="numeric"
          maxLength={4}
          onChangeText={text => setLevel(text)}
          placeholderTextColor={colors.gray}
        />
        <EQText style={styles.header}>Coin</EQText>
        <TextInput
          style={styles.input}
          placeholder="Coin"
          keyboardType="numeric"
          maxLength={10}
          value={coin.toString()}
          onChangeText={text => setNewCoin(text)}
          placeholderTextColor={colors.gray}
        />
        <Pressable
          style={styles.buttonContainer}
          onPress={handleSave}
          sound={SOUNDS.BUTTON_CLICK}>
          <EQText style={styles.saveText}>Save</EQText>
        </Pressable>
        <Pressable
          style={[styles.buttonContainer, {backgroundColor: colors.red}]}
          onPress={handleReset}
          sound={SOUNDS.BUTTON_CLICK}>
          <EQText style={[styles.saveText, {color: colors.white}]}>
            RESET
          </EQText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  input: {
    backgroundColor: colors.darkCard,
    borderRadius: 8,
    color: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  header: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
  content: {
    flex: 1,
    gap: 12,
    padding: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 20,
    borderRadius: 12,
    marginTop: 40,
  },
  saveText: {
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
});
