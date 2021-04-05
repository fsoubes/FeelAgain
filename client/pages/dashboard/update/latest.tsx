import React, { Fragment, useEffect, useState } from "react";
import ProductsList from "../../../src/components/Dashboard/Product/ProductList";
import {
  useGetShoesQuery,
  useRemoveShoeMutation,
} from "../../../src/generated/graphql";
import { NextPage } from "next";
import Pagination from "../../../src/components/Pagination/Pagination";
import { useRouter } from "next/router";

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

  let { data, refetch } = useGetShoesQuery({
    variables: {
      limit: 15,
      page: currentPage ? currentPage : 1,
      sort: "id_desc",
    },
  });

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ): Promise<void> => {
    try {
      await remove({
        variables: { shoeId: id },
      });
      e.stopPropagation();
    } catch (err) {
      throw err;
    }
  };

  return (
    <Fragment>
      {data && (
        <div
          className="container__shop"
          style={{ paddingLeft: "5%", paddingRight: "5%" }}
        >
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
        </div>
      )}
    </Fragment>
  );
};

Latest.getInitialProps = async ({ query: { page } }) => {
  return { page: parseInt(page as string) };
};

export default Latest;
