import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

export const supabase = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_ANON_KEY ?? '',
);

export enum TABLES {
  PROFILES = 'profiles',
}
