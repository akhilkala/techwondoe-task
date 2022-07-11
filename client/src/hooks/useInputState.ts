import React, { ChangeEvent, useState } from "react";

interface InputState {
  value: string;
  handleSet: (value: string) => void;
  handleReset: () => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  inputProps: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  };
}

const useInputState = (init?: string): InputState => {
  const initialState = init || "";

  const [value, setValue] = useState(initialState);
  const handleSet = (value: string) => setValue(value);
  const handleReset = () => setValue(initialState);
  const inputProps = {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
      setValue(e.target.value),
  };

  return { value, handleSet, handleReset, setValue, inputProps };
};

export default useInputState;
