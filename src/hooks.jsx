import { useState } from "react";

export const textInputHook = function (initialInput) {
  const [input, setInput] = useState(initialInput);
  const inputText = (e) => setInput(e.target.value);
  const reset = () => setInput("");
  return [input, inputText, reset];
};
