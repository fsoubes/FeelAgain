import search from "material-ui/svg-icons/action/search";
import React, { Fragment } from "react";
import ProductsList from "../../../src/components/Products/ProductsList";
import { useGetShoesQuery } from "../../../src/generated/graphql";

interface LatestProps {}

const Latest: React.FC<LatestProps> = ({}) => {
  let { data } = useGetShoesQuery({
    variables: {
      limit: 16,
      page: 1,
    },
  });

  return (
    <Fragment>
      {data && (
        <div className="container__shop">
          <div
            className="container__header"
            style={{ backgroundColor: "transparent" }}
          >
            <h4>FeelAgain/Shop</h4>
            <h4>{data?.getFilterShoes.pageInfo.totalItem} articles</h4>
          </div>
          <ProductsList shoes={data.getFilterShoes?.edges} />
        </div>
      )}
    </Fragment>
  );
};
export default Latest;
