import { useImperativeHandle, useEffect, useRef, forwardRef } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

interface Review {
  src: string;
  review: string;
}

interface CarouselProps {
  data?: Review[];
  options?: any;
  isTabletorMobile?: boolean;
}

interface SlideProps {
  children: JSX.Element;
}

export const Carousel: React.FC<CarouselProps> = forwardRef(
  ({ options, children, isTabletorMobile }, ref) => {
    const sliderRef = useRef<any>(null);

    useImperativeHandle(ref, () => sliderRef.current);

    useEffect(() => {
      const slider = new Glide(sliderRef.current, options).mount();

      return () => slider.destroy();
    }, [options]);

    return (
      <div className="glide" style={{ marginTop: "2rem" }} ref={sliderRef}>
        <div className="glide__track" data-glide-el="track">
          <ul style={{ margin: "0" }} className="glide__slides">
            {children}
          </ul>
        </div>
        {!isTabletorMobile && (
          <div className="glide__arrows" data-glide-el="controls">
            <button
              style={{
                left: "-5px",
                boxShadow: "none",
                padding: "0",
                color: "black",
                border: "none",
              }}
              className="glide__arrow glide__arrow--left"
              data-glide-dir="<"
            >
              <DoubleArrowIcon
                style={{
                  fontSize: "1.5rem",
                  transform: "rotateY(3.142rad)",
                  width: "unset",
                  height: "50px",
                }}
              />
            </button>
            <button
              style={{
                right: "-5px",
                boxShadow: "none",
                padding: "0",
                color: "black",
                border: "none",
              }}
              className="glide__arrow glide__arrow--right"
              data-glide-dir=">"
            >
              <DoubleArrowIcon
                style={{ fontSize: "1.5rem", width: "unset", height: "50px" }}
              />
            </button>
          </div>
        )}
      </div>
    );
  }
);

export const Slide: React.FC<SlideProps> = forwardRef(
  ({ children }, ref: any) => {
    return (
      <li className="glide__slide" ref={ref}>
        {children}
      </li>
    );
  }
);
