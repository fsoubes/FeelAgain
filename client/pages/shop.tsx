import React from "react";
import { Layout } from "../src/components/Layout";
import { useGetShoesQuery } from "../src/generated/graphql";
import { withApollo } from "../src/utils/withApollo";
import ProductsList from "../src/components/Products/ProductsList";
import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

interface ShopProps {}

interface selectedItem {
  selected: number;
}

const Shop: React.FC<ShopProps> = ({}) => {
  let { data, refetch } = useGetShoesQuery({
    variables: { limit: 16, page: 1 },
    fetchPolicy: "network-only",
  });

  const handleClick = ({ selected }: selectedItem) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    refetch({ page: selected + 1 });
  };

  return (
    <Layout>
      {data && <ProductsList shoes={data.getFilterShoes?.edges} />}
      <ReactPaginate
        nextLabel={<ArrowForwardIosIcon style={{ fontSize: 15 }} />}
        previousLabel={<ArrowBackIosIcon style={{ fontSize: 15 }} />}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={data?.getFilterShoes?.pageInfo.total as number}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handleClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Shop);
