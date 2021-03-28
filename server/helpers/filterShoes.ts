interface filterType {
  size: number[] | null;
  product: string;
  tags: string[];
}

interface cursorOption {
  search: string | null;
  sort: string | null;
  page: number | null;
  limit: number | null;
}

function getFilterOptions<T extends object>(filterOptions: filterType): T {
  let sizeFilter = {
    ...((filterOptions.size as number[]) && {
      $all: filterOptions.size,
    }),
  };

  let shoesFilter = {
    ...(filterOptions.product && {
      product: filterOptions.product,
    }),
  };

  let tagsFilter = {
    ...(filterOptions.tags &&
      filterOptions.tags.length > 0 && {
        $all: filterOptions.tags,
      }),
  };

  let sortOptions = {
    product_type: shoesFilter.product,
    size: Object.keys(sizeFilter).length === 0 ? null : sizeFilter,
    tags: Object.keys(tagsFilter).length === 0 ? null : tagsFilter,
  };

  return Object.entries(sortOptions).reduce(
    (acc, [key, val]) =>
      val === null || val === undefined ? acc : { ...acc, [key]: val },
    {} as T
  );
}

const getCursorOptions = (
  queryCursorOptions: cursorOption,
  count?: boolean
) => {
  const limit = queryCursorOptions.limit ? queryCursorOptions.limit : 16;
  let match = {
    ...((queryCursorOptions.search as string) && {
      $text: {
        $search: queryCursorOptions.search,
      },
    }),
  };

  const cursorOptions = {
    where: match,
    limit: count ? null : limit,
    skip: count ? null : limit * ((queryCursorOptions.page as number) - 1),
  };

  return cursorOptions;
};

const getSortOptions = (sortingType: any) => {
  const sortSeries = sortingType
    ? sortingType.split("_").filter(Boolean)
    : null;

  if (sortingType && sortSeries[0] === "id") {
    sortSeries.splice(0, 1, "_id");
  }

  return sortingType
    ? [
        [
          sortSeries.length > 2
            ? sortSeries.slice(0, 1).join(".")
            : sortSeries[0],
          sortSeries[sortSeries.length - 1],
        ],
      ]
    : null;
};

export const getFilteredShoes = async (
  models?: any,
  sortingType?: any,
  cursorOptions?: any,
  queryFilterOptions?: any,
  selectInfo?: any
): Promise<any> => {
  try {
    const isMetaScore = queryFilterOptions.search
      ? { score: { $meta: "textScore" } }
      : {};

    const totalDocuments = await models
      .find(
        getFilterOptions({ ...queryFilterOptions }),
        isMetaScore,
        getCursorOptions({ ...cursorOptions }, true)
      )
      .sort(sortingType ? getSortOptions(sortingType) : isMetaScore)
      .countDocuments();

    const shoes = await models
      .find(
        getFilterOptions({ ...queryFilterOptions }),
        isMetaScore,
        getCursorOptions({ ...cursorOptions })
      )
      .sort(sortingType ? getSortOptions(sortingType) : isMetaScore)
      .select(selectInfo)
      .lean();

    return {
      edges: shoes,
      pageInfo: {
        total: Math.ceil((totalDocuments / cursorOptions.limit) as number),
        current: cursorOptions.page as number,
        totalItem: totalDocuments,
      },
    };
  } catch (err) {
    throw err;
  }
};
