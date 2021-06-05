import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import {
  Shoes,
  useIncrementCountViewMutation,
} from "../../../generated/graphql";

interface SearchListProps {
  data: Shoes[];
  setSelectedId?:
    | React.Dispatch<React.SetStateAction<string[] | null>>
    | undefined;
}

const SearchList: React.FC<SearchListProps> = ({ data, setSelectedId }) => {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const router = useRouter();
  const [incrementCount] = useIncrementCountViewMutation();

  useEffect(() => {
    refs.current = refs.current.slice(0, data.length);
  }, [data]);

  const handleClick = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    try {
      if (setSelectedId) {
        const selectedId = e.currentTarget.id;
        const CurrentselectedRef = refs.current.filter(
          (item) => item?.id.toString() === selectedId
        );

        if (CurrentselectedRef[0]?.classList.length !== 1) {
          CurrentselectedRef[0]?.classList.add("selected");
        } else {
          CurrentselectedRef[0].classList.remove("selected");
        }

        const selected = refs.current
          .filter((item) => item?.className === "selected")
          .map((item) => item?.id);
        setSelectedId(selected as string[]);
      } else {
        await incrementCount({ variables: { shoeId: id } });
        router.push(`/products/${id}`);
      }
    } catch (err) {
      throw err;
    }
  };

  const newSearch = data.map((item, index) => {
    return (
      <li
        key={item._id}
        tabIndex={1}
        id={item._id}
        ref={(el: any) => {
          refs.current[index] = el;
        }}
        onClick={(e) => handleClick(e, item._id)}
      >
        <div>
          <img
            src={
              item.vendor === "Anaki" ? item.images[2].src : item.images[1].src
            }
            alt=""
          ></img>
        </div>
        <div>
          <div>
            <div>
              <h5>{item.title}</h5>
            </div>
            <div>{item.price}€</div>
          </div>
        </div>
      </li>
    );
  });

  return <ul>{newSearch}</ul>;
};
export default SearchList;
