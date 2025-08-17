import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalProviderProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Keyboard, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {
  BottomSheetContext,
  BottomSheetContextValue,
  ModalProps,
} from '../contexts/BottomsheetContext';

const DEFAULT_OPTIONS: ModalProps = {
  snapPoints: undefined,
  enablePanDownToClose: true,
  content: null,
  pressBehavior: 'close',
};

export const BottomSheetProvider = ({
  children,
}: BottomSheetModalProviderProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [options, setOptions] = useState<ModalProps>({
    ...DEFAULT_OPTIONS,
  });
  const snapPoints = useMemo(() => options.snapPoints || ['50%'], [options]);

  const collapseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const bottomSheetContext: BottomSheetContextValue = useMemo(
    () => ({
      expand: (opts: ModalProps) => {
        Keyboard.dismiss();
        bottomSheetRef.current?.expand();
        setOptions({...DEFAULT_OPTIONS, ...opts});
      },
      close: collapseBottomSheet,
    }),
    [collapseBottomSheet],
  );

  const renderBackdrop = useCallback(
    (backDropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backDropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={options.pressBehavior}
      />
    ),
    [options],
  );

  return (
    <BottomSheetContext.Provider value={bottomSheetContext}>
      {children}
      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enableDynamicSizing={false}
        backgroundStyle={{backgroundColor: colors.darkBackground}}
        handleIndicatorStyle={{backgroundColor: colors.darkBorder}}
        backdropComponent={props => renderBackdrop(props)}>
        <BottomSheetView style={styles.flex}>{options.content}</BottomSheetView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
