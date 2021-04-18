import React from "react";

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
              update(id, parseInt(event.target.value));
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
