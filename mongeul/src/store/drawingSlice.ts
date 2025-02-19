import { Brush, DrawingLine } from "@/types/drawingTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiaryState {
  selectedColor: string;
  selectedBrushSize: number;
  selectedBrush: Brush;
  lines: DrawingLine[];
  history: DrawingLine[][];
  redoStack: DrawingLine[][];
}

const initialState: DiaryState = {
  selectedColor: "#000000",
  selectedBrushSize: 5,
  selectedBrush: "pen",
  lines: [],
  history: [],
  redoStack: [],
};

const drawingSlice = createSlice({
  name: "drawing",
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
    addLine: (state, action: PayloadAction<{ points: number[] }>) => {
      const newLine = {
        points: action.payload.points,
        stroke: state.selectedColor,
        strokeWidth: state.selectedBrushSize,
      };
      state.history.push([...state.lines]);
      state.lines.push(newLine);
      state.redoStack = [];
    },
    removeLine: (state, action: PayloadAction<number>) => {
      state.history.push([...state.lines]); // 현재 상태를 히스토리에 저장
      state.lines = state.lines.filter((_, index) => index !== action.payload);
    },

    updateLines: (state, action: PayloadAction<DrawingLine[]>) => {
      state.lines = action.payload;
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const lastState = state.history.pop();
        if (lastState) {
          state.redoStack.push([...state.lines]); // 현재 상태 redoStack에 저장
          state.lines = lastState;
        }
      }
    },
    redo: (state) => {
      if (state.redoStack.length > 0) {
        const redoState = state.redoStack.pop();
        if (redoState) {
          state.history.push([...state.lines]); // 현재 상태 history에 저장
          state.lines = redoState;
        }
      }
    },
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
} = drawingSlice.actions;
export default drawingSlice.reducer;
