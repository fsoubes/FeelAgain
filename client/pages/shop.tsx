import React, { Fragment } from "react";
import { Layout } from "../src/components/Layout";
import { GetShoesDocument, useGetShoesQuery } from "../src/generated/graphql";
import { withApollo } from "../src/utils/withApollo";
import ProductsList from "../src/components/Products/ProductsList";
import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useRouter } from "next/router";
import { NextPage } from "next";
// import { useApolloClient } from "@apollo/client";

interface ShopProps {
  page?: number;
  search?: string;
}

interface selectedItem {
  selected: number;
}

const Shop: NextPage<ShopProps> = ({ page, search }) => {
  // const client = useApolloClient();
  const router = useRouter();
  let { data, refetch } = useGetShoesQuery({
    variables: { limit: 16, page: page ? page : 1 },
  });

  const handleClick = ({ selected }: selectedItem) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    /*  const data = client.readQuery({
      query: GetShoesDocument,
      variables: {
        limit: 16,
        page: selected + 1,
      },
    });
    console.log(data); */

    setTimeout(() => {
      router.push(
        {
          pathname: router.pathname,
          query: {
            page,
          },
        },
        `/shop?page=${selected + 1}`,
        { shallow: true }
      );

      refetch({ page: selected + 1 });
    }, 500);
  };

  return (
    <Layout>
      {data && (
        <Fragment>
          <ProductsList shoes={data.getFilterShoes?.edges} />
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
            initialPage={page ? page - 1 : 0}
            disableInitialCallback
          />
        </Fragment>
      )}
    </Layout>
  );
};

Shop.getInitialProps = async ({ query: { page, search } }) => {
  return { page: parseInt(page as string), search: search as string };
};

export default withApollo({ ssr: true })(Shop);
