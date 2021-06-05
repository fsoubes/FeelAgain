import { useRef, useEffect } from "react";

const useOutsideAlerter = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  open: Boolean,
  setOpen: React.Dispatch<React.SetStateAction<Boolean>>
) => {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event: any): void {
    if (ref.current && !ref.current.contains(event.target) && open) {
      setOpen(false);
    }
  }

  useEffect(() => {
    // Bind the event listener
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

interface OutsideProps {
  children: JSX.Element;
  open: Boolean;
  setOpen: React.Dispatch<React.SetStateAction<Boolean>>;
}

const Outside: React.FC<OutsideProps> = ({ children, open, setOpen }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, open, setOpen);
  return <div ref={wrapperRef}>{children}</div>;
};
export default Outside;
