import { useEffect, useState } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsVisitor = () => {
  const { data } = useMeQuery();
  const [isVisitor, setVisitor] = useState(false);
  useEffect(() => {
    if (!data?.me) {
      setVisitor(true);
    }
  }, [data]);

  return isVisitor;
};
