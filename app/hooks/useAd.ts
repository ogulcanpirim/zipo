import {useContext} from 'react';
import {AdContext} from '../contexts/AdContext';

export const useAd = () => {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error('useAd must be used within an AdProvider');
  }
  return context;
};
