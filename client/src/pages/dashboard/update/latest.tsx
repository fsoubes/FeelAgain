import { Fragment, useEffect, useState } from "react";
import ProductsList from "../../../components/Dashboard/Product/ProductList";
import {
  useGetShoesQuery,
  useRemoveShoeMutation,
} from "../../../generated/graphql";
import { NextPage } from "next";
import Pagination from "../../../components/Pagination/Pagination";
import { useRouter } from "next/router";
import Spinner from "../../../components/Spinner/Spinner";

interface LatestProps {
  page?: number;
}

const Latest: NextPage<LatestProps> = ({ page }) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(page as number);

  useEffect(() => {
    setCurrentPage(parseInt(router.query.page as string));
  }, []);

  const [remove] = useRemoveShoeMutation();

  let { data, refetch, loading } = useGetShoesQuery({
    variables: {
      limit: 15,
      page: currentPage ? currentPage : 1,
      sort: "id_desc",
      is_published: false,
    },
  });

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ): boolean => {
    try {
      remove({
        variables: { shoeId: id },
      });
      e?.stopPropagation();
      return true;
    } catch (err) {
      throw err;
    }
  };

  return (
    <Fragment>
      <div
        className="container__shop"
        style={{ paddingLeft: "0%", paddingRight: "0%", minHeight: "100vh" }}
      >
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: "3rem",
            }}
          >
            <Spinner />
          </div>
        )}

        {data && (
          <Fragment>
            <div
              style={{
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "space-between",
                padding: "5px",
              }}
            >
              <h4>FeelAgain/Dashboard/Latest</h4>
              <h4>{data?.getFilterShoes.pageInfo.totalItem} articles</h4>
            </div>
            <ProductsList
              shoes={data.getFilterShoes?.edges}
              remove={handleClick}
            />

            <Pagination
              refetch={refetch}
              page={currentPage}
              total={data?.getFilterShoes?.pageInfo.total as number}
              path={"/dashboard/update/latest"}
            />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Latest.getInitialProps = async ({ query: { page } }) => {
  return { page: parseInt(page as string) };
};

export default Latest;
