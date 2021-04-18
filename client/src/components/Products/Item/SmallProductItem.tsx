import React, { useRef, useEffect, useState } from "react";

interface SmallProductItemProps {
  title: string;
  src: string;
  price: number;
  contain: boolean;
  available: boolean;
  quantity: number;
  remove: any;
  update: (itemId: string, quantity: number) => void;
  id: string;
}
const delay = 1;

const SmallProductItem: React.FC<SmallProductItemProps> = ({
  title,
  src,
  price,
  contain,
  available,
  quantity,
  remove,
  update,
  id,
}) => {
  const [value, setValue] = useState<string>("");

  useEffect(
    () => {
      if (!value) {
        return;
      }

      let timer1 = setTimeout(() => update(id, parseInt(value)), delay * 1000);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    [value]
  );

  return (
    <li>
      <div
        style={{
          backgroundImage: `url( ${src} )`,
          backgroundSize: contain ? "contain" : "cover",
        }}
      ></div>
      <div>
        <div>
          <h3>{title}</h3>
          <div>
            <span>{price},00&nbsp;€</span>
            <span>&nbsp;~&nbsp;</span>
            <span style={{ color: available ? "green" : "red" }}>
              {available ? `En stock` : `Stock insuffisant`}
            </span>
          </div>
        </div>
        <div>
          <span>Qté:&nbsp;</span>
          <input
            type="number"
            step="1"
            min="1"
            max="30"
            defaultValue={quantity}
            onChange={async (event) => {
              setValue(event.target.value);
            }}
          ></input>
        </div>
        <div>
          <span onClick={remove}>Supprimer</span>
          <span className="test">|</span>
          <span>Mettre de côté</span>
        </div>
      </div>
    </li>
  );
};
export default React.memo(SmallProductItem);
