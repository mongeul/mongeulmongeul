import { useDispatch, useSelector } from "react-redux";
import { undo, redo } from "@/store/drawingSlice";
import { RootState } from "@/store/store";
import UndoIcon from "@/assets/icons/undo.svg";
import RedoIcon from "@/assets/icons/redo.svg";
import UndoRedoButton from "../atoms/UndoRedoButton";

export default function UndoRedoButtons() {
  const dispatch = useDispatch();
  const { history, redoStack } = useSelector(
    (state: RootState) => state.drawing
  );

  return (
    <div className="flex gap-2">
      <UndoRedoButton
        onClick={() => dispatch(undo())}
        disabled={history.length === 0}
      >
        <UndoIcon />
      </UndoRedoButton>
      <UndoRedoButton
        onClick={() => dispatch(redo())}
        disabled={redoStack.length === 0}
      >
        <RedoIcon />
      </UndoRedoButton>
    </div>
  );
}
