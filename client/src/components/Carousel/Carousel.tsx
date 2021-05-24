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
}

interface SlideProps {
  children: JSX.Element;
}

export const Carousel: React.FC<CarouselProps> = forwardRef(
  ({ options, children }, ref) => {
    const sliderRef = useRef<any>(null);

    useImperativeHandle(ref, () => sliderRef.current);

    useEffect(() => {
      const slider = new Glide(sliderRef.current, options);

      slider.mount();

      //   return () => slider.destroy();
    }, [options]);

    return (
      <div className="glide" ref={sliderRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">{children}</ul>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button
            style={{
              left: "0",
              boxShadow: "none",
              padding: "0",
              color: "black",
              border: "none",
            }}
            className="glide__arrow glide__arrow--left"
            data-glide-dir="<"
          >
            <DoubleArrowIcon
              style={{ fontSize: "2.5rem", transform: "rotateY(3.142rad)" }}
            />
          </button>
          <button
            style={{
              right: "0",
              boxShadow: "none",
              padding: "0",
              color: "black",
              border: "none",
            }}
            className="glide__arrow glide__arrow--right"
            data-glide-dir=">"
          >
            <DoubleArrowIcon style={{ fontSize: "2.5rem" }} />
          </button>
        </div>
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
