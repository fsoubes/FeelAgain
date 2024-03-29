import { useState, useLayoutEffect, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const [isClient, setIsClient] = useState(false);

  const useEnhancedEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  const isTabletorMobile = useMediaQuery({
    maxWidth: 1024,
  });

  const isMobile = useMediaQuery({
    maxWidth: 414,
  });

  useEnhancedEffect(() => {
    if (typeof window !== "undefined") setIsClient(true);
  }, []);

  return {
    isClient,
    isMobile: isClient ? isMobile : false,
    isTabletorMobile: isClient ? isTabletorMobile : false,
  };
};

export default useResponsive;
