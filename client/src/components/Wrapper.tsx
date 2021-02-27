import React from "react";

export type WrapperVariant = "main-center" | "main";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "main-center",
}) => {
  return <main className={variant}>{children}</main>;
};
