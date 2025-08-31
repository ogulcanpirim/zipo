import Purchases, {PurchasesPackage} from 'react-native-purchases';
import {OFFERINGS} from '../constants/game';
import {useAppDispatch} from '../store';
import {
  updateCoinPacks,
  updatePremiumPackage,
} from '../store/slicers/user.slice';
import {useGlobalLoader} from './useGlobalLoader';

const APIKeys = {
  apple: process.env.REVENUE_CAT_API_KEY,
};

export const useRevenueCat = () => {
  const dispatch = useAppDispatch();
  const {setLoading} = useGlobalLoader();

  const initialize = async () => {
    Purchases.configure({apiKey: APIKeys.apple ?? ''});
    await loadOfferings();
  };

  const loadOfferings = async () => {
    const offerings = await Purchases.getOfferings();
    if (offerings.current) {
      dispatch(
        updateCoinPacks(
          offerings.all?.[OFFERINGS.COIN_PACKS]?.availablePackages,
        ),
      );
      dispatch(
        updatePremiumPackage(
          offerings.all?.[OFFERINGS.PREMIUM].availablePackages[0],
        ),
      );
    }
  };

  const purchasePackage = async (pack: PurchasesPackage) => {
    setLoading(true);
    try {
      const makePurchaseResult = await Purchases.purchasePackage(pack);
      return makePurchaseResult;
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const restorePurchases = async () => {
    setLoading(true);
    const customer = await Purchases.restorePurchases();
    setLoading(false);
    return customer;
  };

  return {
    restorePurchases,
    purchasePackage,
    initialize,
  };
};
