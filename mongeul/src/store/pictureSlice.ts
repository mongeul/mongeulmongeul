import { Brush, PictureLine } from "@/types/pictureTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PictureState {
  selectedColor: string;
  selectedBrushSize: number;
  selectedBrush: Brush;
  lines: PictureLine[];
  history: Array<PictureLine[]>;
  redoStack: Array<PictureLine[]>;
}

const MAX_HISTORY_LENGTH = 30;

const initialState: PictureState = {
  selectedColor: "#000000",
  selectedBrushSize: 5,
  selectedBrush: "pen",
  lines: [],
  history: [],
  redoStack: [],
};

// 히스토리/리도스택 최대 길이 제한
const pushWithLimit = <T>(arr: T[], item: T, limit: number) => {
  if (arr.length >= limit) arr.shift();
  arr.push(item);
};

const pictureSlice = createSlice({
  name: "picture",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.selectedColor = action.payload;
      if (state.selectedBrush === "eraser") {
        state.selectedBrush = "pen";
      }
    },
    setBrushSize: (state, action: PayloadAction<number>) => {
      state.selectedBrushSize = action.payload;
    },
    setBrushType: (state, action: PayloadAction<Brush>) => {
      state.selectedBrush = action.payload;
    },
    addLine: (state, action: PayloadAction<{ points: [number, number][] }>) => {
      const newLine: PictureLine = {
        points: action.payload.points,
        stroke: state.selectedColor,
        strokeWidth: state.selectedBrushSize,
      };

      pushWithLimit(state.history, [...state.lines], MAX_HISTORY_LENGTH);
      state.lines.push(newLine);
      state.redoStack = [];
    },
    removeLine: (state, action: PayloadAction<number>) => {
      pushWithLimit(state.history, [...state.lines], MAX_HISTORY_LENGTH);
      state.lines = state.lines.filter((_, index) => index !== action.payload);
    },
    updateLines: (state, action: PayloadAction<PictureLine[]>) => {
      state.lines = action.payload;
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const lastState = state.history.pop();
        if (lastState) {
          pushWithLimit(state.redoStack, [...state.lines], MAX_HISTORY_LENGTH);
          state.lines = lastState;
        }
      }
    },
    redo: (state) => {
      if (state.redoStack.length > 0) {
        const redoState = state.redoStack.pop();
        if (redoState) {
          pushWithLimit(state.history, [...state.lines], MAX_HISTORY_LENGTH);
          state.lines = redoState;
        }
      }
    },
    resetPicture: () => initialState,
  },
});

export const {
  setColor,
  setBrushSize,
  setBrushType,
  addLine,
  removeLine,
  updateLines,
  undo,
  redo,
  resetPicture,
} = pictureSlice.actions;

export default pictureSlice.reducer;
