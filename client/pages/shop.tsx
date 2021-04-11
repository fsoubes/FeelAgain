import React, { useEffect, useState } from "react";
import { Layout } from "../src/components/Layout";
import { useGetShoesQuery } from "../src/generated/graphql";
import { withApollo } from "../src/utils/withApollo";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Pagination from "../src/components/Pagination/Pagination";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Button } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import CustomAccordion from "../src/components/Accordion/Accordion";
import ProductListDash from "../src/components/Dashboard/Product/ProductList";
import Sort from "../src/components/Sort/Sort";

interface ShopProps {
  page?: number;
  search?: string;
}

const Shop: NextPage<ShopProps> = ({ page, search }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(page as number);

  const [isFilter, setFilter] = useState<Boolean>(false);
  const [isSorting, setSorting] = useState<Boolean>(false);

  let { data, refetch } = useGetShoesQuery({
    variables: {
      limit: 15,
      page: currentPage ? currentPage : 1,
      ...(search && {
        search: search,
      }),
    },
  });

  useEffect(() => {
    setCurrentPage(parseInt(router.query.page as string));
  }, []);

  const sortOptions = [
    "Meilleures ventes",
    "Nouveautés",
    "Prix ascendants",
    "Prix descendants",
    "Alphabétiques A-Z",
    "Alphabétiques Z-A",
  ];

  return (
    <Layout>
      {data && (
        <div className="container__shop">
          <div
            className="container__header"
            style={{ backgroundColor: "#d7d7dd" }}
          >
            <h2>FeelAgain/Shop</h2>
            <h2>
              {search
                ? `${data?.getFilterShoes.pageInfo.totalItem} résultats pour “${search}”`
                : `${data?.getFilterShoes.pageInfo.totalItem} articles`}
            </h2>
          </div>
          <div
            className="container__header"
            style={{ backgroundColor: "transparent" }}
          >
            <div>
              <Button onClick={() => setFilter(!isFilter)}>
                <FilterListIcon />
                <span>Afficher les filtres</span>
              </Button>
            </div>
            <div style={{ position: "relative" }}>
              <Button onClick={() => setSorting(!isSorting)}>
                <span>Trier</span>
                <SortIcon />
              </Button>
              {isSorting && <Sort options={sortOptions} />}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {isFilter && <CustomAccordion />}
            <ProductListDash shoes={data.getFilterShoes?.edges} />
          </div>
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
