import React, { useEffect, useState } from "react";
import { Layout } from "../src/components/Layout";
import { useGetShoesQuery } from "../src/generated/graphql";
import { withApollo } from "../src/utils/withApollo";
import ProductsList from "../src/components/Products/ProductsList";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Pagination from "../src/components/Pagination/Pagination";

interface ShopProps {
  page?: number;
  search?: string;
}

const Shop: NextPage<ShopProps> = ({ page, search }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(page as number);

  let { data, refetch } = useGetShoesQuery({
    variables: {
      limit: 16,
      page: currentPage ? currentPage : 1,
      ...(search && {
        search: search,
      }),
    },
  });

  useEffect(() => {
    setCurrentPage(parseInt(router.query.page as string));
  }, []);

  return (
    <Layout>
      {data && (
        <div className="container__shop">
          <div
            className="container__header"
            style={{ backgroundColor: "transparent" }}
          >
            <h4>FeelAgain/Shop</h4>
            <h4>
              {search
                ? `${data?.getFilterShoes.pageInfo.totalItem} résultats pour “${search}”`
                : `${data?.getFilterShoes.pageInfo.totalItem} articles`}
            </h4>
          </div>
          <ProductsList shoes={data.getFilterShoes?.edges} />

          <Pagination
            refetch={refetch}
            page={currentPage}
            path={"/shop"}
            total={data?.getFilterShoes?.pageInfo.total as number}
            search={search}
          />
        </div>
      )}
    </Layout>
  );
};

Shop.getInitialProps = async ({ query: { page, search } }) => {
  return { page: parseInt(page as string), search: search as string };
};

export default withApollo({ ssr: true })(Shop);
