import InputBasket from "../../Input/InputBasket";

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
  size?: string;
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
  size,
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

            {size && (
              <>
                <span>&nbsp;~&nbsp;</span>
                <span>&nbsp;Taille:&nbsp;{parseInt(size)}</span>
              </>
            )}
          </div>
        </div>
        <div>
          <span>Qté:&nbsp;</span>
          {size ? (
            <InputBasket
              update={update}
              id={id}
              quantity={quantity}
            ></InputBasket>
          ) : (
            <span>1</span>
          )}
          <span>&nbsp;&nbsp;</span>
          {size && (
            <span style={{ color: available ? "green" : "red" }}>
              {available ? `En stock` : `Stock insuffisant`}
            </span>
          )}
        </div>
        <div>
          <span onClick={remove}>Supprimer</span>
          <span>|</span>
          <span>Mettre de côté</span>
        </div>
      </div>
    </li>
  );
};
export default SmallProductItem;
