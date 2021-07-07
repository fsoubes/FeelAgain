import { useState, useEffect } from "react";

export const useIntersection = (element: any, rootMargin: string) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );

    element && observer.observe(element.current as Element);
    return () => observer.unobserve(element.current);
  }, []);

  return isVisible;
};
