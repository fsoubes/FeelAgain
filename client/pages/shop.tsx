import React from "react";
import { Layout } from "../src/components/Layout";
import { useGetShoesQuery } from "../src/generated/graphql";
import { withApollo } from "../src/utils/withApollo";
import ProductsList from "../src/components/Products/ProductsList";

interface ShopProps {}

const Shop: React.FC<ShopProps> = ({}) => {
  const { data } = useGetShoesQuery({
    variables: { limit: 10 },
  });

  return (
    <Layout>{data && <ProductsList shoes={data.getFilterShoes} />}</Layout>
  );
};

export default withApollo({ ssr: true })(Shop);
