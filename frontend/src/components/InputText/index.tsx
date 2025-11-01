import React, { type JSX } from "react";
import TextField from "@mui/material/TextField";
import clsx from "clsx";
import type { InputTextProps } from "./type";

import styles from "./inputText.module.css";
import { InputAdornment } from "@mui/material";

const InputText: React.FC<InputTextProps> = ({
  label,
  className,
  type = "text",
  multiline = false,
  iconStart,
  iconEnd,
  ...props
}): JSX.Element => {
  return (
    <div className={clsx(styles.container, className)}>
      {label && <label className={styles.label}>{label}</label>}

      <TextField
        {...props}
        type={type}
        multiline={multiline}
        variant={props.variant || "outlined"}
        label={undefined}
        fullWidth={props.fullWidth !== undefined ? props.fullWidth : true}
        className={styles.input}
        slotProps={{
          input: {
            startAdornment: iconStart ? (
              <InputAdornment position="start">{iconStart}</InputAdornment>
            ) : undefined,
            endAdornment: iconEnd ? (
              <InputAdornment position="end">{iconEnd}</InputAdornment>
            ) : undefined,
          },
        }}
      />
    </div>
  );
};

export default InputText;
