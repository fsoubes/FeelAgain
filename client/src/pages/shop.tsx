import React, { useEffect, useState, Fragment } from "react";
import { Layout } from "../components/Layout";
import { useGetShoesQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Pagination from "../components/Pagination/Pagination";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Button } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import CustomAccordion from "../components/Accordion/Accordion";
import ProductListDash from "../components/Dashboard/Product/ProductList";
import Sort from "../components/Sort/Sort";
import Outside from "../components/OutsideEvent/Outside";
import styles from "../styles/Shop.module.scss";

interface ShopProps {
  page?: number;
  search?: string;
  size?: string | string[];
  tags?: string | string[];
  sort?: string;
  product?: string;
}

const sortOptions = {
  id_asc: "Meilleures ventes",
  id_desc: "Nouveautés",
  price_asc: "Prix ascendants",
  price_desc: "Prix descendants",
  title_asc: "Alphabétiques A-Z",
  title_desc: "Alphabétiques Z-A",
};

const Shop: NextPage<ShopProps> = ({
  page,
  search,
  size,
  tags,
  product,
  sort,
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(page as number);
  const [isFilter, setFilter] = useState<Boolean>(false);
  const [isSorting, setSorting] = useState<Boolean>(false);
  const [sortingBy, setSort] = useState<String | null>(null);
  const [currentSearch, setSearch] = useState<String | null>(search as string);

  let { data, refetch } = useGetShoesQuery({
    variables: {
      limit: 15,
      page: currentPage ? currentPage : 1,
      ...(search && {
        search: search,
      }),
      ...((tags as string[]) &&
        (tags as string[]).length > 0 && {
          tags: tags,
        }),
      ...((size as string[]) &&
        (size as string[]).length > 0 && {
          size: (size as string[]).map((item) => parseFloat(item)),
        }),
      ...(product && {
        product: product,
      }),
      ...(sort && {
        sort: sort,
      }),
    },
  });

  useEffect(() => {
    if (sort) setSort(sort as string);
    if (search) setSearch(search);
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
              {currentSearch
                ? `${data?.getFilterShoes.pageInfo.totalItem} résultats pour “${currentSearch}”`
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
                      router={router}
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
          <div className={styles.container}>
            <CustomAccordion
              setCurrentPage={setCurrentPage}
              currentSearch={currentSearch as string}
              setSearch={setSearch}
              setSort={setSort}
              refetch={refetch}
              sortingBy={sortingBy}
              isOpen={isFilter}
              size={size}
              tags={tags}
              product={product}
            />

            <ProductListDash
              shoes={data.getFilterShoes?.edges}
              path={"/products/"}
            />
          </div>
          <Pagination
            path={"/shop"}
            refetch={refetch}
            page={currentPage}
            total={data?.getFilterShoes?.pageInfo.total as number}
          />
        </div>
      )}
    </Layout>
  );
};

Shop.getInitialProps = async ({
  query: { page, search, size, tags, sort, product },
}) => {
  return {
    page: parseInt(page as string),
    search: search as string,
    size: size as string | string[],
    tags: tags ? encodeURIComponent(tags as string) : undefined,
    sort: sort as string,
    product: product as string,
  };
};

export default withApollo({ ssr: true })(Shop);