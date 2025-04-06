import { useRef } from "react";

let saved = false;

export function markDiarySaved() {
  saved = true;
}

export function useDiarySaveStatus() {
  const ref = useRef(saved);
  return ref.current;
}
