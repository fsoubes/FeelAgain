import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserRoleQuery } from "../generated/graphql";

export const useIsAdmin = () => {
  const { data, loading } = useUserRoleQuery();
  const router = useRouter();
  useEffect(() => {
    if (!data?.userRole) {
      router.push("/404");
    }
  }, [loading, data, router]);
};
