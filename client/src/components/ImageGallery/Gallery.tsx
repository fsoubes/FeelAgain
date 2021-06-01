import React, { useRef, useEffect, useState, RefObject } from "react";
import ImageGallery from "react-image-gallery";
import useResponsive from "../../utils/useResponsive";
import "react-image-gallery/styles/css/image-gallery.css";

interface IMage {
  original: string;
  thumbnail: string;
}

interface GalleryProps {
  img: IMage[];
}

const Gallery: React.FC<GalleryProps> = ({ img }) => {
  const ref = useRef<any>(null);
  const thumbClicked = useRef(false);
  const [isFullScreen, setFullScreen] = useState(false);

  const { isMobile } = useResponsive();

  const handleCloseEvent = (e: any) => {
    setTimeout(() => {
      if (isMobile) {
        return;
      }
      if (isFullScreen) {
        if (!thumbClicked.current) {
          ref.current.exitFullScreen();
          setFullScreen(false);
        }
      }
      if (thumbClicked.current) {
        thumbClicked.current = false;
      }
    }, 150);
  };

  const handleEsc = (e: any) => {
    if (e.keyCode === 27) {
      if (isFullScreen) {
        setFullScreen(false);
      }
    }
  };

  useEffect(() => {
    if (isMobile) {
      return;
    }
    if (isFullScreen) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("mousedown", handleCloseEvent);
      document.addEventListener("touchstart", handleCloseEvent);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleCloseEvent);
      document.removeEventListener("touchstart", handleCloseEvent);
    };
  }, [isFullScreen]);

  return (
    <ImageGallery
      thumbnailPosition={"right"}
      ref={ref}
      showFullscreenButton={true}
      showPlayButton={false}
      showBullets={false}
      showNav={false}
      onThumbnailClick={(e) => {
        if (isFullScreen) {
          thumbClicked.current = true;
        }
      }}
      onClick={() => {
        if (!isFullScreen) {
          if (ref && ref.current) {
            ref.current.fullScreen();
            setFullScreen(true);
          }
        }
      }}
      items={img}
    />
  );
};
export default Gallery;
