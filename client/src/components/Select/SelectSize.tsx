import React, { useState } from "react";
import Outside from "../OutsideEvent/Outside";
import styles from "../../styles/Product.module.scss";

interface SelectSizeProps {
  sizes: number[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  variants: any;
}

const SelectSize: React.FC<SelectSizeProps> = ({
  sizes,
  setIndex,
  variants,
}) => {
  const [size, setSize] = useState<number>(36);
  const [openSize, setOpenSize] = useState<Boolean>(false);

  return (
    <div
      className={styles.size}
      style={{ zIndex: 50 }}
      onClick={() => setOpenSize(!openSize)}
    >
      <Outside open={openSize} setOpen={setOpenSize}>
        <ul>
          <div className={styles.current} style={{ padding: "10px" }}>
            {size}
          </div>
          {sizes.map((item, index) => {
            return (
              <li
                onClick={() => {
                  setSize(item);
                  setIndex(index);
                }}
                key={item}
                className={
                  openSize
                    ? `${styles.item__size} ${
                        variants[index].quantity === 0
                          ? styles.notavailable
                          : styles.show
                      }`
                    : `${styles.item__size} ${styles.hidden}`
                }
              >
                {item}
              </li>
            );
          })}
        </ul>
      </Outside>
    </div>
  );
};
export default SelectSize;
