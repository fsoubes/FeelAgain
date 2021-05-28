import React from "react";
import CartProduct from "../src/components/Cart/CartProduct";
import LargeCartProduct from "../src/components/Cart/LargeCartProduct";
import SmallCartProduct from "../src/components/Cart/SmallCartProduct";
import { Layout } from "../src/components/Layout";
import useResponsive from "../src/utils/useResponsive";
import { withApollo } from "../src/utils/withApollo";

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
