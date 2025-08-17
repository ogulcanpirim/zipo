import {createSlice} from '@reduxjs/toolkit';
import {
  CLEAR_COST,
  SOLVE_COST,
  START_COIN,
  UNDO_COST,
} from '../../constants/game';

interface UserDataState {
  currentLevel: number;
  globalLoading: boolean;
  coin: number;
}

const initialState: UserDataState = {
  currentLevel: 1,
  globalLoading: false,
  coin: START_COIN,
};

export const userSlicer = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setCurrentLevel: (state, action) => {
      state.currentLevel = action.payload;
    },
    incrementLevel: state => {
      state.currentLevel += 1;
    },
    resetLevel: state => {
      state.currentLevel = 1;
    },
    setCoin: (state, action) => {
      state.coin = action.payload;
    },
    buyClearBoard: state => {
      state.coin -= CLEAR_COST;
    },
    buyUndo: state => {
      state.coin -= UNDO_COST;
    },
    buySolve: state => {
      state.coin -= SOLVE_COST;
    },
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const {
  setCurrentLevel,
  incrementLevel,
  resetLevel,
  setCoin,
  buyClearBoard,
  buyUndo,
  buySolve,
  setGlobalLoading,
} = userSlicer.actions;
export default userSlicer.reducer;
