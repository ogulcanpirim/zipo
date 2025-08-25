import {getUniqueId} from 'react-native-device-info';
import {storage} from '../store';
import {supabase, TABLES} from '../core/supabase';
import {LAST_COLLECTED_TIME} from '../constants/game';
import moment from 'moment';

export const useUser = () => {
  const checkUser = async () => {
    const storedDeviceId = storage.getString('device_id');
    if (!storedDeviceId) {
      const device_id = await getUniqueId();
      storage.set('device_id', device_id);
      return device_id;
    }
    return storedDeviceId;
  };

  const updateUser = async () => {
    //Collector
    if (!storage.getString(LAST_COLLECTED_TIME)) {
      storage.set(LAST_COLLECTED_TIME, moment().toISOString());
    }
    // Test the functionality
    // else {
    //   storage.set(
    //     LAST_COLLECTED_TIME,
    //     moment().subtract(5, 'hours').toISOString(),
    //   );
    // }
    const userData = JSON.parse(
      storage.getString('persist:root') || '{}',
    )?.userData;
    const {coin, currentLevel, isPro} = JSON.parse(userData || '{}');
    const id = await checkUser();
    const formattedId = id.replaceAll('"', '');
    if (id && coin) {
      const {data, error} = await supabase
        .from(TABLES.PROFILES)
        .upsert({
          id: formattedId,
          coin,
          level: currentLevel,
          is_pro: isPro,
        })
        .setHeader('x-user-id', formattedId)
        .select();
      if (error) {
        console.error('Error updating user:', JSON.stringify(error));
        console.log('Data:', JSON.stringify(data));
      }
    }
  };

  return {updateUser};
};
