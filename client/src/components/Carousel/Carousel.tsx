import {
  useImperativeHandle,
  useEffect,
  useRef,
  forwardRef,
  useState,
} from "react";
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
  isLanding?: boolean;
}

interface SlideProps {
  children: JSX.Element;
}

export const Carousel: React.FC<CarouselProps> = forwardRef(
  ({ options, children, isTabletorMobile, isLanding = true }, ref) => {
    const sliderRef = useRef<any>(null);
    const [isHover, setHover] = useState(false);

    useImperativeHandle(ref, () => sliderRef.current);

    useEffect(() => {
      const slider = new Glide(sliderRef.current, options).mount();
      return () => slider.destroy();
    }, [options]);

    return (
      <div className="glide" style={{ marginTop: "1rem" }} ref={sliderRef}>
        <div className="glide__track" data-glide-el="track">
          <ul style={{ margin: "0" }} className="glide__slides">
            {children}
          </ul>
        </div>
        {!isTabletorMobile && (
          <div className="glide__arrows" data-glide-el="controls">
            <button
              style={{
                boxShadow: "none",
                padding: "0",
                color: "black",
                border: "none",
                left: isLanding ? "-5px" : "0px",
                background: isLanding ? "none" : "rgba(255,255,255,0.7)",
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
                boxShadow: "none",
                padding: "0",
                color: "black",
                border: "none",
                right: isLanding ? "-5px" : "0px",
                background: isLanding ? "none" : "rgba(255,255,255,0.7)",
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
