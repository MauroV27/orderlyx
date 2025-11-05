import { Button, IconButton } from "@mui/material";
import type { CustomButtomProps } from "./type";
import clsx from "clsx";

import styles from "./customButton.module.css";

const CustomButton = ({
  children,
  className,
  variant = "contained",
  size = "medium",
  icon,
  ...props
}: CustomButtomProps) => {
  const sizeClass = styles[`size--${size}`];
  const variantClass = styles[`variant--${variant}`];

  const baseClasses = clsx(
    styles.customButtomContainer,
    sizeClass,
    variantClass,
    className
  );

  if (icon) {
    return (
      <IconButton
        {...props}
        className={clsx(baseClasses, styles.iconButton)}
        size={size as "small" | "medium" | "large"}
      >
        {icon}
      </IconButton>
    );
  }

  return (
    <Button {...props} variant={variant} className={baseClasses}>
      {children}
    </Button>
  );
};

export default CustomButton;
