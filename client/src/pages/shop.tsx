import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Button } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import { Layout } from "../components/Layout";
import { useGetShoesQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import { NextPage } from "next";
import Pagination from "../components/Pagination/Pagination";
import ProductListDash from "../components/Dashboard/Product/ProductList";
import styles from "../styles/Shop.module.scss";
import Head from "../components/SEO/Head";
import useResponsive from "../utils/useResponsive";
const CustomAccordion = dynamic(() =>
  import("../components/Accordion/Accordion")
);
const Sort = dynamic(() => import("../components/Sort/Sort"));
const Outside = dynamic(() => import("../components/OutsideEvent/Outside"));

interface ShopProps {
  page?: number;
  search?: string;
  size?: string | string[];
  tags?: string | string[];
  sort?: string;
  product?: string;
}

const fillEmpty = {
  _id: "",
  src: "",
  price: "",
  title: "",
  score: "",
  vendor: "",
};

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

  const { isMobile } = useResponsive();

  let { data, refetch } = useGetShoesQuery({
    variables: {
      limit: isMobile ? 14 : 15,
      page: currentPage ? currentPage : 1,
      ...(search && {
        search: search,
      }),
      ...((tags as string[]) &&
        (tags as string[]).length > 0 && {
          tags: tags,
        }),
      ...((size as string) && {
        size: (size as string).split(",").map((item) => parseFloat(item)),
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
      <Head
        title={"Shop Feelagain"}
        description={
          "Parcourir la boutique/shop pour y découvrir nos produits/chaussures"
        }
      />

      <div className="container__shop">
        {/*      <header>
              <nav>
                <Link href="/">
                  <span className={styles.route__home}>Acceuil</span>
                </Link>
                <em className={styles.delimiter}>/</em>
                <Link href="/blog">
                  <span>Blog</span>
                </Link>
                <em className={styles.delimiter}>/</em>
                <span> {data?.getSingleArticle.title}</span>
              </nav>
            </header> */}
        <div
          className="container__header"
          style={{
            backgroundColor: "rgba(215, 215, 221,.5",
          }}
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
              <span style={{ fontFamily: `"Marcellus", serif` }}>
                {isFilter ? "Masquer" : "Afficher"} les filtres
              </span>
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
                  <span style={{ fontFamily: `"Marcellus", serif` }}>
                    Trier
                  </span>
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
            search={search}
          />
          {!data ? (
            <ProductListDash
              path={"/products/"}
              shoes={Array(15).fill(fillEmpty)}
            />
          ) : (
            <ProductListDash
              shoes={data.getFilterShoes?.edges}
              path={"/products/"}
            />
          )}
        </div>
        <Pagination
          path={"/shop"}
          refetch={refetch}
          page={currentPage}
          total={data?.getFilterShoes?.pageInfo.total as number}
        />
      </div>
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
