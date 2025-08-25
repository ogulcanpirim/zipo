import React, {useMemo, useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {
  ModalContext,
  ModalContextValue,
  PortalModalProps,
} from '../contexts/ModalContext';
import {useSound} from '../hooks/useSound';
import {SOUNDS} from '../models/game';

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({children}: ModalProviderProps) => {
  const [content, setContent] = useState<React.ReactNode>(null);
  const {play} = useSound();

  const modalContext: ModalContextValue = useMemo(
    () => ({
      expand: (opts: PortalModalProps) => {
        setContent(opts.content);
      },
      close: () => setContent(null),
    }),
    [],
  );

  const handleClose = () => {
    play(SOUNDS.BUTTON_CLICK);
    modalContext.close();
  };

  return (
    <ModalContext.Provider value={modalContext}>
      <>
        {children}
        {content ? (
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={handleClose}>
              <View style={StyleSheet.absoluteFill} />
            </TouchableWithoutFeedback>
            <View style={styles.content}>{content}</View>
          </View>
        ) : null}
      </>
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    zIndex: 99,
  },
  content: {
    zIndex: 100,
  },
});
