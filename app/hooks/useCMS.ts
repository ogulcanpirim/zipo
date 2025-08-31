import {supabase, TABLES} from '../core/supabase';
import {useAppDispatch} from '../store';
import {
  resetLevelCompletionCount,
  updateFromCMS,
} from '../store/slicers/user.slice';

export const useCMS = () => {
  const dispatch = useAppDispatch();
  const updateSettings = async () => {
    // Reset Level Completion Count
    dispatch(resetLevelCompletionCount());
    const {data, error} = await supabase.from(TABLES.CMS).select('*').single();
    if (!error) {
      dispatch(updateFromCMS(data));
    } else {
      console.log('error:', JSON.stringify(error));
    }
  };

  return {updateSettings};
};
