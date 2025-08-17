import {BottomSheetProps} from '@gorhom/bottom-sheet';
import {createContext} from 'react';

export interface ModalProps {
  snapPoints?: BottomSheetProps['snapPoints'];
  enablePanDownToClose?: boolean;
  content: React.ReactNode;
  pressBehavior?: 'none' | 'close' | 'collapse' | number;
}

export interface BottomSheetContextValue {
  expand: (modalProps: ModalProps) => void;
  close: () => void;
}

export const BottomSheetContext = createContext<
  BottomSheetContextValue | undefined
>(undefined);
