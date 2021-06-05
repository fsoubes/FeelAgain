import { memo } from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import useResponsive from "../../utils/useResponsive";
import { getUrl } from "../../utils/getUrl";
import { Irouter } from "../../types/routing";

interface PaginationProps {
  refetch: any;
  total: number;
  page?: number;
  path?: string;
}

interface selectedItem {
  selected: number;
}

const Pagination: React.FC<PaginationProps> = ({
  refetch,
  total,
  page,
  path,
}) => {
  const { isMobile } = useResponsive();
  const router = useRouter();

  const handleClick = async ({ selected }: selectedItem) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const updated = selected + 1;

    setTimeout(async () => {
      const currentRouter: Irouter = {
        ...router.query,
        page: `${updated}`,
      };

      router.push(
        {
          pathname: router.pathname,
          query: { ...currentRouter },
        },
        `${path}${getUrl(currentRouter)}`,
        { shallow: true }
      );

      await refetch({ page: updated });
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

export default memo(Pagination);
