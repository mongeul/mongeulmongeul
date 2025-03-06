"use client";

import { useDispatch, useSelector } from "react-redux";
import { undo, redo } from "@/store/pictureSlice";
import { RootState } from "@/store/store";
import UndoIcon from "@/assets/icons/undo.svg";
import RedoIcon from "@/assets/icons/redo.svg";
import UndoRedoButton from "../atoms/UndoRedoButton";

export default function UndoRedoButtons() {
  const dispatch = useDispatch();
  const { history, redoStack } = useSelector(
    (state: RootState) => state.picture
  );

  return (
    <div className="flex gap-2 px-6 py-2">
      <UndoRedoButton
        onClick={() => dispatch(undo())}
        disabled={history.length === 0}
      >
        <UndoIcon className="w-5 h-5" />
      </UndoRedoButton>
      <UndoRedoButton
        onClick={() => dispatch(redo())}
        disabled={redoStack.length === 0}
      >
        <RedoIcon className="w-5 h-5" />
      </UndoRedoButton>
    </div>
  );
}
