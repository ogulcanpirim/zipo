import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ModalContext,
  ModalContextValue,
  PortalModalProps,
} from '../contexts/ModalContext';

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({children}: ModalProviderProps) => {
  const [content, setContent] = useState<React.ReactNode>(null);

  const modalContext: ModalContextValue = useMemo(
    () => ({
      expand: (opts: PortalModalProps) => {
        setContent(opts.content);
      },
      close: () => setContent(null),
    }),
    [],
  );

  return (
    <ModalContext.Provider value={modalContext}>
      <>
        {children}
        {content ? (
          <View onTouchEnd={modalContext.close} style={styles.overlay}>
            {content}
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
});
