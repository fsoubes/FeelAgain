import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import TopBar from "./TopBar";

interface LayoutProps {
  variant?: WrapperVariant;
  isBasket?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant,
  isBasket,
}) => {
  return (
    <>
      <TopBar isBasket={isBasket} />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
