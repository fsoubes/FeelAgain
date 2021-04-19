import React from "react";
import CartProduct from "../src/components/Cart/CartProduct";
import LargeCartProduct from "../src/components/Cart/LargeCartProduct";
import { Layout } from "../src/components/Layout";
import { withApollo } from "../src/utils/withApollo";

interface PanierProps {}

const Panier: React.FC<PanierProps> = ({}) => {
  return (
    <Layout>
      <div className="container__shop">
        <CartProduct isOpen={true}>
          <LargeCartProduct />
        </CartProduct>
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Panier);
