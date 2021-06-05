interface SummaryItemProps {
  size: number;
  title: string;
  src: string;
  contain: boolean;
  quantity: number;
  price: number;
}

const SummaryItem: React.FC<SummaryItemProps> = ({
  size,
  title,
  src,
  contain,
  quantity,
  price,
}) => {
  return (
    <li>
      <div>
        <div
          style={{
            backgroundImage: `url( ${src} )`,
            backgroundSize: contain ? "contain" : "cover",
          }}
        ></div>
        <div>
          <span>{title}</span>
          <span>{size}</span>
        </div>
      </div>
      <div>
        <span>{price},00&nbsp;€</span>
        <span>(x{quantity})</span>
      </div>
    </li>
  );
};
export default SummaryItem;
