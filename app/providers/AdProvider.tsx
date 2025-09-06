import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  RewardedAd,
  RewardedAdEventType,
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import {AdContext, AdContextValue} from '../contexts/AdContext';
import {useAppSelector} from '../hooks/useAppSelector';

interface AdProviderProps {
  children: React.ReactNode;
}

export const AdProvider: React.FC<AdProviderProps> = ({children}) => {
  const {ads_enabled} = useAppSelector(state => state.userData);
  const [isRewardAdLoaded, setIsRewardAdLoaded] = useState(false);
  const [isInterstitialAdLoaded, setIsInterstitialAdLoaded] = useState(false);

  // Create ad instances
  const rewardedAd = useMemo(
    () =>
      RewardedAd.createForAdRequest(
        __DEV__ ? TestIds.REWARDED : 'ca-app-pub-5097211111237502/3974638408',
      ),
    [],
  );

  const interstitialAd = useMemo(
    () =>
      InterstitialAd.createForAdRequest(
        __DEV__
          ? TestIds.INTERSTITIAL
          : 'ca-app-pub-5097211111237502/2390093991',
      ),
    [],
  );

  // Load rewarded ad
  const loadRewardedAd = useCallback(() => {
    setIsRewardAdLoaded(false); // Reset loading state
    // Add a small delay to ensure previous ad is fully closed
    setTimeout(() => {
      rewardedAd.load();
    }, 500);
  }, [rewardedAd]);

  // Load interstitial ad
  const loadInterstitialAd = useCallback(() => {
    setIsInterstitialAdLoaded(false); // Reset loading state
    // Add a small delay to ensure previous ad is fully closed
    setTimeout(() => {
      interstitialAd.load();
    }, 500);
  }, [interstitialAd]);

  // Show reward ad
  const showRewardAd = useCallback((): Promise<boolean> => {
    return new Promise(resolve => {
      if (!isRewardAdLoaded) {
        resolve(false);
        return;
      }

      // Set up one-time event listeners for this ad show
      const unsubscribeLoaded = rewardedAd.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          setIsRewardAdLoaded(true);
        },
      );

      const unsubscribeEarned = rewardedAd.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        () => {
          // Clean up all listeners
          unsubscribeLoaded();
          unsubscribeEarned();
          unsubscribeClosed();
          unsubscribeError();
          resolve(true);
          // Reload the ad for next use after a small delay
          setTimeout(() => {
            loadRewardedAd();
          }, 1000);
        },
      );

      const unsubscribeClosed = rewardedAd.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          // Clean up all listeners
          unsubscribeLoaded();
          unsubscribeEarned();
          unsubscribeClosed();
          unsubscribeError();
          resolve(false);
          // Reload the ad for next use after a small delay
          setTimeout(() => {
            loadRewardedAd();
          }, 1000);
        },
      );

      const unsubscribeError = rewardedAd.addAdEventListener(
        AdEventType.ERROR,
        () => {
          // Clean up all listeners
          unsubscribeLoaded();
          unsubscribeEarned();
          unsubscribeClosed();
          unsubscribeError();
          resolve(false);
          // Reload the ad for next use after a small delay
          setTimeout(() => {
            loadRewardedAd();
          }, 1000);
        },
      );

      // Show the ad
      rewardedAd.show();

      // Clean up event listeners after the ad is closed or reward is earned
      // We'll clean them up in the event handlers instead of using setTimeout
    });
  }, [isRewardAdLoaded, rewardedAd, loadRewardedAd]);

  // Show interstitial ad
  const showInterstitialAd = useCallback((): Promise<void> => {
    return new Promise(resolve => {
      if (!isInterstitialAdLoaded) {
        resolve();
        return;
      }

      // Set up one-time event listeners for this ad show
      const unsubscribeClosed = interstitialAd.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          // Clean up all listeners
          unsubscribeClosed();
          unsubscribeError();
          resolve();
          // Reload the ad for next use after a small delay
          setTimeout(() => {
            loadInterstitialAd();
          }, 1000);
        },
      );

      const unsubscribeError = interstitialAd.addAdEventListener(
        AdEventType.ERROR,
        () => {
          // Clean up all listeners
          unsubscribeClosed();
          unsubscribeError();
          resolve();
          // Reload the ad for next use after a small delay
          setTimeout(() => {
            loadInterstitialAd();
          }, 1000);
        },
      );

      // Show the ad
      interstitialAd.show();

      // Clean up event listeners after the ad is closed
      // We'll clean them up in the event handlers instead of using setTimeout
    });
  }, [isInterstitialAdLoaded, interstitialAd, loadInterstitialAd]);

  const showInterstitialAdEveryFourthLevel = useCallback(
    (levelCompletionCount: number): Promise<void> => {
      if ((levelCompletionCount + 1) % 4 === 0) {
        return showInterstitialAd();
      }
      return Promise.resolve();
    },
    [showInterstitialAd],
  );

  // Manual reload methods for debugging and recovery
  const reloadRewardAd = useCallback(() => {
    loadRewardedAd();
  }, [loadRewardedAd]);

  const reloadInterstitialAd = useCallback(() => {
    loadInterstitialAd();
  }, [loadInterstitialAd]);

  // Set up event listeners for ad loading
  useEffect(() => {
    if (!ads_enabled) {
      return;
    }
    // Rewarded ad event listeners
    const unsubscribeRewardedLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setIsRewardAdLoaded(true);
      },
    );

    const unsubscribeRewardedError = rewardedAd.addAdEventListener(
      AdEventType.ERROR,
      () => {
        setIsRewardAdLoaded(false);
        // Retry loading after a delay
        setTimeout(() => {
          loadRewardedAd();
        }, 5000);
      },
    );

    // Interstitial ad event listeners
    const unsubscribeInterstitialLoaded = interstitialAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setIsInterstitialAdLoaded(true);
      },
    );

    const unsubscribeInterstitialError = interstitialAd.addAdEventListener(
      AdEventType.ERROR,
      () => {
        setIsInterstitialAdLoaded(false);
        // Retry loading after a delay
        setTimeout(() => {
          loadInterstitialAd();
        }, 5000);
      },
    );

    // Load ads initially
    loadRewardedAd();
    loadInterstitialAd();

    return () => {
      unsubscribeRewardedLoaded();
      unsubscribeRewardedError();
      unsubscribeInterstitialLoaded();
      unsubscribeInterstitialError();
    };
  }, [
    rewardedAd,
    interstitialAd,
    loadRewardedAd,
    loadInterstitialAd,
    ads_enabled,
  ]);

  const contextValue: AdContextValue = useMemo(
    () => ({
      showRewardAd,
      showInterstitialAd,
      showInterstitialAdEveryFourthLevel,
      reloadRewardAd,
      reloadInterstitialAd,
      isRewardAdLoaded,
      isInterstitialAdLoaded,
    }),
    [
      showRewardAd,
      showInterstitialAd,
      showInterstitialAdEveryFourthLevel,
      reloadRewardAd,
      reloadInterstitialAd,
      isRewardAdLoaded,
      isInterstitialAdLoaded,
    ],
  );

  return (
    <AdContext.Provider value={contextValue}>{children}</AdContext.Provider>
  );
};
