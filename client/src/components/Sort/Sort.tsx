import { NextRouter } from "next/router";
import styles from "../../styles/Sort.module.scss";
import { Irouter } from "../../types/routing";
import { getUrl } from "../../utils/getUrl";

interface sortoptions {
  id_asc: string;
  id_desc: string;
  price_asc: string;
  price_desc: string;
  title_asc: string;
  title_desc: string;
}

interface SortProps {
  isSort: String | null;
  options: sortoptions;
  setSort: React.Dispatch<React.SetStateAction<String | null>>;
  closing: React.Dispatch<React.SetStateAction<Boolean>>;
  router: NextRouter;
}

const Sort: React.FC<SortProps> = ({
  options,
  setSort,
  closing,
  isSort,
  router,
}) => {
  const handleClick = (item: keyof sortoptions) => {
    const currentRouter: Irouter = {
      ...router.query,
      sort: `${item}`,
    };

    router.push(
      {
        pathname: router.pathname,
        query: { ...currentRouter },
      },
      `/shop${getUrl(currentRouter)}`,
      { shallow: true }
    );

    setSort(item);
    closing(false);
  };

  const listOptions = Object.keys(options).map((item, index) => (
    <li
      className={styles.item}
      key={index}
      onClick={() => handleClick(item as keyof sortoptions)}
    >
      {(options as any)[item]}
      {item === isSort ? ` ✓` : ""}
    </li>
  ));

  return (
    <div className={styles.container}>
      <ul className={styles.list}>{listOptions}</ul>
    </div>
  );
};
export default Sort;
