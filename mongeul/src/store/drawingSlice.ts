import { Brush, DrawingLine } from "@/types/drawingTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiaryState {
  selectedColor: string;
  selectedBrushSize: number;
  selectedBrush: Brush;
  lines: DrawingLine[];
  history: Array<DrawingLine[]>;
  redoStack: Array<DrawingLine[]>;
}

const initialState: DiaryState = {
  selectedColor: "#000000",
  selectedBrushSize: 5,
  selectedBrush: "pen",
  lines: [] as DrawingLine[],
  history: [] as Array<DrawingLine[]>,
  redoStack: [] as Array<DrawingLine[]>,
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
    addLine: (state, action: PayloadAction<{ points: [number, number][] }>) => {
      const newLine: DrawingLine = {
        points: action.payload.points,
        stroke: state.selectedColor,
        strokeWidth: state.selectedBrushSize,
      };
      state.history.push([...state.lines]);
      state.lines.push(newLine);
      state.redoStack = [];
    },
    removeLine: (state, action: PayloadAction<number>) => {
      state.history.push([...state.lines]);
      state.lines = state.lines.filter((_, index) => index !== action.payload);
    },
    updateLines: (state, action: PayloadAction<DrawingLine[]>) => {
      state.lines = action.payload;
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const lastState = state.history.pop();
        if (lastState) {
          state.redoStack.push([...state.lines]);
          state.lines = lastState;
        }
      }
    },
    redo: (state) => {
      if (state.redoStack.length > 0) {
        const redoState = state.redoStack.pop();
        if (redoState) {
          state.history.push([...state.lines]);
          state.lines = redoState;
        }
      }
    },
    resetDrawing: () => initialState,
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
  resetDrawing,
} = drawingSlice.actions;
export default drawingSlice.reducer;
