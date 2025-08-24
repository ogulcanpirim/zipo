import {getUniqueId} from 'react-native-device-info';
import {storage} from '../store';
import {supabase, TABLES} from '../core/supabase';

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
    const userData = JSON.parse(
      storage.getString('persist:root') || '{}',
    )?.userData;
    const {coin, currentLevel} = JSON.parse(userData || '{}');
    const id = await checkUser();
    if (id && coin) {
      const {data, error} = await supabase
        .from(TABLES.PROFILES)
        .upsert({id: id.replaceAll('"', ''), coin, level: currentLevel})
        .select();
      if (error) {
        console.error('Error updating user:', JSON.stringify(error));
        console.log('Data:', JSON.stringify(data));
      }
    }
  };

  return {updateUser};
};
