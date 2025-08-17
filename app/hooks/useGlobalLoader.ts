import {useAppDispatch} from '../store';
import {setGlobalLoading} from '../store/slicers/user.slice';
import {useAppSelector} from './useAppSelector';

export const useGlobalLoader = () => {
  const dispatch = useAppDispatch();
  const {globalLoading} = useAppSelector(state => state.userData);
  const setLoading = (isLoading: boolean) => {
    dispatch(setGlobalLoading(isLoading));
  };
  return {loading: globalLoading, setLoading};
};
