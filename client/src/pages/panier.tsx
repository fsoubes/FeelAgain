import CartProduct from "../components/Cart/CartProduct";
import LargeCartProduct from "../components/Cart/LargeCartProduct";
import SmallCartProduct from "../components/Cart/SmallCartProduct";
import { Layout } from "../components/Layout";
import useResponsive from "../utils/useResponsive";
import { withApollo } from "../utils/withApollo";

interface PanierProps {}

const Panier: React.FC<PanierProps> = ({}) => {
  const { isTabletorMobile } = useResponsive();

  return (
    <Layout>
      <div className="container__shop">
        {!isTabletorMobile && (
          <CartProduct isOpen={true}>
            <LargeCartProduct />
          </CartProduct>
        )}
        {isTabletorMobile && (
          <CartProduct isOpen={true}>
            <SmallCartProduct />
          </CartProduct>
        )}
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Panier);
