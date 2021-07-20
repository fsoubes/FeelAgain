import { useState } from "react";
import Outside from "../OutsideEvent/Outside";
import styles from "../../styles/Product.module.scss";

interface SelectSizeProps {
  sizes: number[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  variants: any;
  gift?: boolean;
}

const SelectSize: React.FC<SelectSizeProps> = ({
  sizes,
  setIndex,
  variants,
  gift = false,
}) => {
  const [size, setSize] = useState<number>(25);
  const [openSize, setOpenSize] = useState<Boolean>(false);

  return (
    <div
      className={gift ? `${styles.size} ${styles.full}` : styles.size}
      style={{ zIndex: 50 }}
      onClick={() => setOpenSize(!openSize)}
    >
      <Outside open={openSize} setOpen={setOpenSize}>
        <ul>
          <div className={styles.current} style={{ padding: "10px" }}>
            {gift ? `${size}€` : size}
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
                        gift
                          ? styles.show
                          : variants[index].quantity === 0
                          ? styles.notavailable
                          : styles.show
                      }`
                    : `${styles.item__size} ${styles.hidden}`
                }
              >
                {gift ? `${item}€` : item}
              </li>
            );
          })}
        </ul>
      </Outside>
    </div>
  );
};
export default SelectSize;
