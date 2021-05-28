import { NextRouter } from "next/router";
import { Irouter } from "../types/routing";

export const getUrl = (currentRouter: any) => {
  return Object.keys(currentRouter).reduce((acc, current, index) => {
    if (currentRouter[current].length === 0) return acc;
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
  isColor: boolean,
  router: NextRouter
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
    ...(isColor && {
      ["tags"]:
        (cleanParams as string[]).length === params.length
          ? [...cleanParams, inputValue]
          : cleanParams,
    }),
    ...(!isColor && {
      ["size"]:
        (cleanParams as string[]).length === params.length
          ? [...cleanParams, inputValue]
          : cleanParams,
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
