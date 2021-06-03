import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";
import Menu from "../components/Admin/Menu";
import { useIsAdmin } from "../utils/useIsAdmin";
import { useRouter } from "next/router";
import styles from "../styles/Dashboard.module.scss";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const router = useRouter();
  useIsAdmin();
  useEffect(() => {
    if (router.pathname === "/dashboard") router.push("/dashboard/add");
  }, [router]);

  return (
    <div className="container__dashboard">
      <Menu title={"Menu"} />
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default withApollo({ ssr: false })(Dashboard);
