import React from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import useResponsive from "../../utils/useResponsive";

interface PaginationProps {
  refetch: any;
  total: number;
  page?: number;
  search?: string;
  path: string;
}

interface selectedItem {
  selected: number;
}

const Pagination: React.FC<PaginationProps> = ({
  refetch,
  total,
  page,
  search,
  path,
}) => {
  const { isMobile } = useResponsive();
  const router = useRouter();

  const handleClick = ({ selected }: selectedItem) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const updated = selected + 1;

    setTimeout(() => {
      /*  const data = client.readQuery({
      query: GetShoesDocument,
      variables: {
        limit: 16,
        page: selected + 1,
      },
    });
    console.log(data); */

      router.push(
        {
          pathname: router.pathname,
          query: {
            page: updated,
            search,
          },
        },
        search
          ? `${path}?page=${updated}&search=${search}`
          : `${path}?page=${updated}`,
        { shallow: true }
      );

      refetch({ page: updated });
    }, 500);
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <ReactPaginate
        nextLabel={<ArrowForwardIosIcon style={{ fontSize: 15 }} />}
        previousLabel={<ArrowBackIosIcon style={{ fontSize: 15 }} />}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={total}
        marginPagesDisplayed={isMobile ? 1 : 2}
        pageRangeDisplayed={isMobile ? 2 : 5}
        onPageChange={handleClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        initialPage={page ? page - 1 : 0}
        disableInitialCallback
      />
    </div>
  );
};
export default React.memo(Pagination);
