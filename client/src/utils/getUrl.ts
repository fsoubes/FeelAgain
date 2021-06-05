import { NextRouter } from "next/router";
import { Irouter } from "../types/routing";

export const getUrl = (currentRouter: any) => {
  return Object.keys(currentRouter).reduce((acc, current, index) => {
    if (!currentRouter[current] || currentRouter[current].length === 0)
      return acc;

    const routeValue =
      typeof currentRouter[current as keyof typeof currentRouter] === "object"
        ? (currentRouter[
            current as keyof typeof currentRouter
          ] as string[]).join()
        : currentRouter[current as keyof typeof currentRouter];
    acc =
      index === 0
        ? `?${current}=${routeValue}`
        : `${acc}&${current}=${routeValue}`;
    return acc;
  }, "");
};

export const cleanRoute = (
  currentParams: string | string[] | undefined,
  inputValue: string,
  router: NextRouter,
  segment: string
) => {
  let params: string[] = [];
  let cleanParams: string[] = [];

  if (currentParams) {
    if (typeof currentParams === "string")
      params =
        (currentParams as string).split(",").length > 0
          ? (currentParams as string).split(",")
          : (currentParams as string).split("");
    else {
      params = currentParams as string[];
    }
    cleanParams = params.filter((item) => item !== inputValue);
  } else {
    cleanParams.push(inputValue);
  }

  const currentRouter: Irouter = {
    ...router.query,
    ...(router.query.tags && {
      tags:
        typeof (router.query.tags as string) === "object"
          ? (router.query.tags as string[]).map((item) =>
              item === decodeURIComponent(item)
                ? encodeURIComponent(item)
                : item
            )
          : (router.query.tags as string)
              .split(",")
              .map((item) =>
                item === decodeURIComponent(item)
                  ? encodeURIComponent(item)
                  : item
              ),
    }),
    ...(segment && {
      [segment]:
        (cleanParams as string[]).length === params.length
          ? [
              ...cleanParams.map((item) =>
                item === decodeURIComponent(item)
                  ? encodeURIComponent(item)
                  : item
              ),
              inputValue,
            ]
          : cleanParams.map((item) =>
              item === decodeURIComponent(item)
                ? encodeURIComponent(item)
                : item
            ),
    }),
  };



  router.push(
    {
      pathname: router.pathname,
      query: { ...currentRouter },
    },
    `/shop${getUrl(currentRouter)}`,
    { shallow: true }
  );

  return true;
};
