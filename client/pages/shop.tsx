import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../src/components/Layout";
import { useGetShoesQuery } from "../src/generated/graphql";
import { withApollo } from "../src/utils/withApollo";

interface ShopProps {}

const Shop: React.FC<ShopProps> = ({}) => {
  const router = useRouter();
  const { data } = useGetShoesQuery({
    variables: { limit: 10 },
  });

  const getTitle = data?.getFilterShoes.map((item) => {
    return (
      <div>
        <img width="256" height="256" src={item.images[2].src}></img>
        <h4>{item.title}</h4>
      </div>
    );
  });

  return (
    <Layout>
      <div>{getTitle}</div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Shop);
