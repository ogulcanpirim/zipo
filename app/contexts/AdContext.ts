import {createContext} from 'react';

export interface AdContextValue {
  showRewardAd: () => Promise<boolean>;
  showInterstitialAd: () => Promise<void>;
  showInterstitialAdEveryFourthLevel: (levelCompletionCount: number) => Promise<void>;
  reloadRewardAd: () => void;
  reloadInterstitialAd: () => void;
  isRewardAdLoaded: boolean;
  isInterstitialAdLoaded: boolean;
}

export const AdContext = createContext<AdContextValue | undefined>(undefined);
