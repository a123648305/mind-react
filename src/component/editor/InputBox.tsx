import React, { useEffect, useRef } from "react";
import { getKeyCode } from "./utils";

type PropsType = {
  defaultValue?: string;
  width?: number;
  onSubmit: Function;
  onChange: Function;
  onCancel: Function;
};

const InputBox: React.FC<PropsType> = ({
  defaultValue,
  onChange,
  onSubmit,
  onCancel,
  width = 120,
}) => {
  const inputRef = useRef<any>();

  const onKeydown = (evt: any) => {
    evt.stopPropagation();
    //@ts-ignore
    const { KeyMap } = window.kityminder;
    const keyCode = getKeyCode(evt);
    if (keyCode === KeyMap.enter) {
      onSubmit();
    }
    if (keyCode === KeyMap.esc) {
      onCancel();
    }
  };

  const onInputChange = (e: any) => {
    const { value } = e.target;
    onChange(value);
  };

  useEffect(() => {
    // 自动聚焦
    inputRef.current.focus();
  }, [defaultValue]);

  return (
    <input
      ref={inputRef}
      defaultValue={defaultValue}
      onChange={onInputChange}
      onKeyDown={onKeydown}
      onBlur={(e) => onSubmit(e)}
      style={{
        width,
        border: "none",
        outline: "none",
        paddingLeft: 5,
      }}
    />
  );
};

export default InputBox;
