import FilterItem from "./FilterItem/FilterItem";
import styles from "../../styles/Filter.module.scss";
import { UpdateFilterAction } from "../../types/filter";
import { NextRouter } from "next/router";

interface FilterListProps {
  data: any;
  isColor?: boolean;
  update: React.Dispatch<UpdateFilterAction>;
  router: NextRouter;
}

const FilterList: React.FC<FilterListProps> = ({
  data,
  isColor = false,
  update,
  router,
}) => {
  const filterOptions = data.map((item: any, index: number) => {
    return (
      <FilterItem
        router={router}
        key={index}
        size={item.size}
        hex={item.hex}
        isColor={isColor as boolean}
        update={update}
        check={item.checked}
        color={item.color}
      />
    );
  });

  return <div className={styles.container}>{filterOptions}</div>;
};
export default FilterList;
