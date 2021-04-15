import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

interface TiltProps {
  style?: React.CSSProperties | undefined;
  children: JSX.Element;
  isTilt?: Boolean;
}

const options = {
  scale: 1.05,
  speed: 400,
  max: 20,
};

const Tilt: React.FC<TiltProps> = ({ style, children, isTilt = true }) => {
  const divRef = useRef<any>(null);

  useEffect((): any => {
    if (!isTilt) {
      return;
    }
    const node = divRef.current;
    if (node) {
      VanillaTilt.init(node, options);
      return () => node.vanillaTilt.destroy();
    } else {
      return null;
    }
  }, [options]);

  return (
    <div ref={divRef} {...{ style }}>
      {children}
    </div>
  );
};
export default Tilt;
