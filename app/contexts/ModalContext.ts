import {createContext} from 'react';

export interface PortalModalProps {
  content: React.ReactNode;
}

export interface ModalContextValue {
  expand: (modalProps: PortalModalProps) => void;
  close: () => void;
}

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined,
);
