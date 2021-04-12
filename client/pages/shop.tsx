import React, { useEffect, useState, Fragment } from "react";
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
import Outside from "../src/components/OutsideEvent/Outside";

interface ShopProps {
  page?: number;
  search?: string;
}
interface sortoptions {
  id_asc: string;
  id_desc: string;
  price_asc: string;
  price_desc: string;
  title_asc: string;
  title_desc: string;
}

const sortOptions = {
  id_asc: "Meilleures ventes",
  id_desc: "Nouveautés",
  price_asc: "Prix ascendants",
  price_desc: "Prix descendants",
  title_asc: "Alphabétiques A-Z",
  title_desc: "Alphabétiques Z-A",
};

const Shop: NextPage<ShopProps> = ({ page, search }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(page as number);
  const [isFilter, setFilter] = useState<Boolean>(false);
  const [isSorting, setSorting] = useState<Boolean>(false);
  const [sortingBy, setSort] = useState<String | null>(null);

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

  return (
    <Layout>
      {data && (
        <div className="container__shop">
          <div
            className="container__header"
            style={{ backgroundColor: "rgba(215, 215, 221,.5" }}
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
                <span>{isFilter ? "Masquer" : "Afficher"} les filtres</span>
              </Button>
            </div>
            <div style={{ position: "relative" }}>
              <Outside open={isSorting} setOpen={setSorting}>
                <Fragment>
                  <Button
                    onClick={() => {
                      setSorting(!isSorting);
                    }}
                  >
                    <span>Trier</span>
                    <SortIcon />
                  </Button>
                  {isSorting && (
                    <Sort
                      isSort={sortingBy}
                      options={sortOptions}
                      setSort={setSort}
                      closing={setSorting}
                    />
                  )}
                </Fragment>
              </Outside>
            </div>
          </div>
          <div style={{ display: "flex", position: "relative" }}>
            <CustomAccordion
              setSort={setSort}
              refetch={refetch}
              sortingBy={sortingBy}
              isOpen={isFilter}
            />

            <ProductListDash
              shoes={data.getFilterShoes?.edges}
              path={"/products/"}
            />
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
