import React, { type JSX } from "react";

import clsx from "clsx";
import styles from "./logo.module.css";

export interface LogoProps {
  onlyIcon?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  onlyIcon = true,
  size = "medium",
  className,
}): JSX.Element => {
  const variantClass = onlyIcon
    ? styles[`icon-${size}`]
    : styles[`full-${size}`];

  return (
    <img
      src={`/${onlyIcon ? "ordelyx.svg" : "ordelyxFull.svg"}`}
      alt="Ordelyx logo"
      className={clsx(styles.logo, variantClass, className)}
    />
  );
};

export default Logo;
