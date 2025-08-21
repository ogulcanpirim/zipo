import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {Storage, persistStore, persistReducer} from 'redux-persist';
import {useDispatch} from 'react-redux';
import userReducer from './slicers/user.slice';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const reducer = combineReducers({
  userData: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export type RootState = ReturnType<typeof reducer>;
const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [] as any,
});
const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export default {store, persistor};
