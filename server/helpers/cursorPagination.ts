import {
  PaginatedBlogResponse,
  PaginatedCommentsResponse,
} from "resolvers/types/PaginatedResponse";

export const cursorPagination = async (
  models: any,
  limit: number,
  id: string,
  cursor: string,
  cursorType: string,
  findType?: string,
  isAdmin?: boolean
): Promise<PaginatedBlogResponse | PaginatedCommentsResponse | []> => {
  limit = limit ? limit : 10;
  let match = {
    ...(cursor && {
      [cursorType]: {
        $gt: cursor,
      },
    }),
    ...((!isAdmin && (cursorType !== "_id" && { is_published: true })) as any),
  };

  const search = id
    ? {
        [findType as string]: id,
      }
    : {};

  const sortOptions = id
    ? {}
    : {
        [cursorType]: 1,
      };

  const cursorOptions = cursor
    ? {
        limit: limit + 1,
        where: match,
      }
    : {
        where: match,
        limit: limit + 1,
      };

  const documents = await models
    .find(search, {}, { ...cursorOptions })
    .sort(sortOptions)
    .lean();

  const hasNextPage = documents.length > limit;

  if (documents.length > 0) {
    const edges = hasNextPage ? documents.slice(0, -1) : documents;

    return {
      edges: [...edges],
      pageInfo: {
        hasNextPage: hasNextPage,
        endCursor:
          cursorType === "_id"
            ? edges[edges.length - 1]._id
            : edges[edges.length - 1].title,
      },
    };
  } else {
    return [];
  }
};
