import { useState, useEffect } from "react";
import Outside from "../OutsideEvent/Outside";
import styles from "../../styles/Product.module.scss";
import { useRouter } from "next/router";

interface SelectRelativeProps {
  title: string;

  data: any;
}

const SelectRelative: React.FC<SelectRelativeProps> = ({
  title,

  data,
}) => {
  const router = useRouter();
  const [currentTitle, setTitle] = useState<string | undefined>(
    title as string
  );
  const [open, setOpen] = useState<Boolean>(false);

  useEffect(() => {
    setTitle(title);
  }, [title]);

  const handleChange = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    id: string,
    newTitle: string
  ) => {
    event?.preventDefault();
    router.push(`/products/${id}`);
    setTitle(newTitle);
    setOpen(false);
  };

  return (
    <div
      style={{ zIndex: 49 }}
      className={styles.size}
      onClick={() => setOpen(!open)}
    >
      <Outside open={open} setOpen={setOpen}>
        <ul>
          {data.map((item: any, index: number) => {
            return (
              <li
                key={item._id}
                onClick={(event) => handleChange(event, item._id, item.title)}
                className={
                  item.title === currentTitle || open
                    ? `${styles.item__relatives} ${
                        index === 0 ? styles.current : styles.show
                      }`
                    : `${styles.item__relatives} ${styles.hidden}`
                }
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      </Outside>
    </div>
  );
};
export default SelectRelative;
