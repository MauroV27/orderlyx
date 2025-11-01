import { Button } from "@mui/material";
import type { CustomButtomProps } from "./type";
import clsx from "clsx";

import styles from "./customButton.module.css";

const CustomButton = ({
  className,
  variant = "contained",
  ...props
}: CustomButtomProps) => {
  return (
    <Button
      {...props}
      variant={variant}
      className={clsx(styles.customButtomContainer, className)}
    />
  );
};

export default CustomButton;
