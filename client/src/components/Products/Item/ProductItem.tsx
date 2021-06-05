import Tilt from "../../Tilt/Tilt";
import { useRouter } from "next/router";

interface ProductItemProps {
  src: string;
  title: string;
  price: number;
  id: string;
  srcIn: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  src,
  title,
  price,
  id,
  srcIn,
}) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`products/${id}`)}>
      <Tilt style={{ cursor: "pointer" }}>
        <img
          alt=""
          loading="lazy"
          src={src}
          onMouseOver={(e) => (e.currentTarget.src = srcIn)}
          onMouseOut={(e) => (e.currentTarget.src = src)}
        ></img>
      </Tilt>
      <div style={{ textAlign: "center" }}>
        <h3>
          <span>{title}</span>
        </h3>
        <span>{price}€</span>
      </div>
    </div>
  );
};
export default ProductItem;
