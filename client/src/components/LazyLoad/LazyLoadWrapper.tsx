import React from "react";
import LazyLoad from "react-lazyload";

interface LazyLoadWrapperProps {
  children: JSX.Element;
}

const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({ children }) => {
  if (typeof window === "undefined") {
    return <div>{children}</div>;
  }
  return <LazyLoad height={200}>{children}</LazyLoad>;
};
export default LazyLoadWrapper;
