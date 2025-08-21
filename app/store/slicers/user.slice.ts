import {createSlice} from '@reduxjs/toolkit';
import {
  CLEAR_COST,
  SOLVE_COST,
  START_COIN,
  UNDO_COST,
} from '../../constants/game';
import {PathTheme} from '../../models/game';
import {PATH_THEMES} from '../../constants/themes';

interface UserDataState {
  currentLevel: number;
  currentPathMoves: string[];
  globalLoading: boolean;
  coin: number;
  pathThemes: PathTheme[];
  pathColor: string;
  selectedTheme: number;
  unlockedThemes: PathTheme[];
}

const initialState: UserDataState = {
  currentLevel: 1,
  currentPathMoves: [],
  globalLoading: false,
  coin: START_COIN,
  pathThemes: PATH_THEMES,
  pathColor: PATH_THEMES[0].color,
  selectedTheme: PATH_THEMES[0].id,
  unlockedThemes: [],
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
    setSelectedTheme: (state, action) => {
      state.selectedTheme = action.payload;
      state.pathColor = state.pathThemes[action.payload - 1].color;
    },
    setCurrentPathMoves: (state, action) => {
      state.currentPathMoves = action.payload;
    },
    clearPathMoves: state => {
      state.currentPathMoves = [];
    },
    buyTheme: (state, action) => {
      const themeId = action.payload;
      const themeToPurchase = state.pathThemes[themeId - 1];
      const {price} = themeToPurchase;
      if (state.coin >= price && state.pathThemes[themeId - 1]) {
        state.coin -= price;
        state.pathThemes[themeId - 1].unlocked = true;
      }
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
  setSelectedTheme,
  buyTheme,
  setCurrentPathMoves,
  clearPathMoves,
} = userSlicer.actions;
export default userSlicer.reducer;
