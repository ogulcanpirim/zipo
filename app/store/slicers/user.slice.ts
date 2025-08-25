import {createSlice} from '@reduxjs/toolkit';
import {MAX_LEVEL, START_COIN} from '../../constants/game';
import {PATH_THEMES} from '../../constants/themes';

interface UserDataState {
  currentLevel: number;
  currentDraggedCells: string[];
  globalLoading: boolean;
  coin: number;
  pathColor: string;
  selectedTheme: number;
  unlockedThemes: number[];
  gameFinished: boolean;
  moves: number[];
  isPro: boolean;
  settings: {
    soundEnabled: boolean;
    vibrateEnabled: boolean;
  };
}

const initialState: UserDataState = {
  currentLevel: 1,
  currentDraggedCells: [],
  globalLoading: false,
  coin: START_COIN,
  pathColor: '#EC4899',
  selectedTheme: 1,
  unlockedThemes: [1],
  gameFinished: false,
  moves: [],
  isPro: false,
  settings: {
    soundEnabled: true,
    vibrateEnabled: true,
  },
};

export const userSlicer = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setCurrentLevel: (state, action) => {
      state.currentLevel = action.payload;
      state.gameFinished = action.payload === MAX_LEVEL;
    },
    incrementLevel: state => {
      if (state.currentLevel < MAX_LEVEL) {
        state.currentLevel += 1;
      } else {
        state.gameFinished = true;
      }
    },
    resetLevel: state => {
      state.currentLevel = 1;
    },
    setCoin: (state, action) => {
      state.coin = action.payload;
    },
    incrementCoin: (state, action) => {
      state.coin += action.payload;
    },
    buyClearBoard: (state, action) => {
      const cost = action.payload;
      state.coin -= cost;
    },
    buyUndo: (state, action) => {
      const cost = action.payload;
      state.coin -= cost;
    },
    buySolve: (state, action) => {
      const cost = action.payload;
      state.coin -= cost;
    },
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    setSelectedTheme: (state, action) => {
      state.selectedTheme = action.payload;
      state.pathColor = PATH_THEMES[action.payload - 1].color;
    },
    setDraggedCells: (state, action) => {
      state.currentDraggedCells = action.payload;
    },
    clearDraggedCells: state => {
      state.currentDraggedCells = [];
    },
    setMoves: (state, action) => {
      state.moves = action.payload;
    },
    clearMoves: state => {
      state.moves = [];
    },
    buyTheme: (state, action) => {
      const themeId = action.payload;
      const themeToPurchase = PATH_THEMES[themeId - 1];
      const {price} = themeToPurchase;
      if (state.coin >= price && PATH_THEMES[themeId - 1]) {
        state.coin -= price;
        state.unlockedThemes = [...state.unlockedThemes, themeId];
      }
    },
    clearData: state => {
      state.currentLevel = 1;
      state.currentDraggedCells = [];
      state.globalLoading = false;
      state.coin = START_COIN;
      state.pathColor = '#EC4899';
      state.selectedTheme = 1;
      state.unlockedThemes = [1];
      state.gameFinished = false;
    },
    setPro: (state, action) => {
      state.isPro = action.payload;
    },
    setSound: (state, action) => {
      state.settings.soundEnabled = action.payload;
    },
    setVibrate: (state, action) => {
      state.settings.vibrateEnabled = action.payload;
    },
  },
});

export const {
  setCurrentLevel,
  incrementLevel,
  resetLevel,
  setCoin,
  incrementCoin,
  buyClearBoard,
  buyUndo,
  buySolve,
  setGlobalLoading,
  setSelectedTheme,
  buyTheme,
  setDraggedCells,
  clearDraggedCells,
  setMoves,
  clearMoves,
  clearData,
  setPro,
  setSound,
  setVibrate,
} = userSlicer.actions;
export default userSlicer.reducer;
