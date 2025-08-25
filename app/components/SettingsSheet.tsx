import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {EQText} from './EQText';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {Pressable} from './Pressable';
import {SOUNDS} from '../models/game';
import {useBottomSheet} from '../hooks/useBottomsheet';
import {Switch} from './Switch';
import {useSound} from '../hooks/useSound';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {useAppDispatch} from '../store';
import {setSound, setVibrate} from '../store/slicers/user.slice';
import {useAppSelector} from '../hooks/useAppSelector';

export const SettingsSheet = () => {
  const settings = useAppSelector(state => state.userData.settings);
  const dispatch = useAppDispatch();
  const {close} = useBottomSheet();
  const {play} = useSound();
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled);
  const [vibrationEnabled, setVibrationEnabled] = useState(
    settings.vibrateEnabled,
  );

  const toggleSound = (value: boolean) => {
    if (value) {
      play(SOUNDS.BUTTON_CLICK, true);
    }
    setSoundEnabled(value);
    dispatch(setSound(value));
  };

  const toggleVibrate = (value: boolean) => {
    if (value) {
      ReactNativeHapticFeedback.trigger('contextClick');
    }
    setVibrationEnabled(value);
    dispatch(setVibrate(value));
  };

  return (
    <View style={styles.modalContainer}>
      <Pressable
        style={styles.closeContainer}
        sound={SOUNDS.BUTTON_CLICK}
        onPress={close}>
        <FontAwesome6Icon name="xmark" size={24} color={colors.white} />
      </Pressable>
      <EQText style={styles.modalTitle}>Settings</EQText>
      <View style={styles.section}>
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <EQText style={styles.settingHeader}>Sound</EQText>
            <EQText style={styles.settingDescription}>
              Enable or disable game sounds and effects.
            </EQText>
          </View>
          <Switch value={soundEnabled} onValueChange={toggleSound} />
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <EQText style={styles.settingHeader}>Vibration</EQText>
            <EQText style={styles.settingDescription}>
              Enable or disable vibration feedback.
            </EQText>
          </View>
          <Switch value={vibrationEnabled} onValueChange={toggleVibrate} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  modalTitle: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 28,
    fontFamily: fonts.bold,
    letterSpacing: 0.5,
  },
  closeContainer: {
    position: 'absolute',
    right: 30,
    top: 0,
    zIndex: 10,
    padding: 8,
  },
  section: {
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: `${colors.white}10`,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 0,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingHeader: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.bold,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: colors.white,
    opacity: 0.7,
    fontFamily: fonts.medium,
  },
});
