import React, { useEffect } from "react";
import { Layout } from "../src/components/Layout";
import { withApollo } from "../src/utils/withApollo";
import Menu from "../src/components/Admin/Menu";
import { useIsAdmin } from "../src/utils/useIsAdmin";
import { useRouter } from "next/router";
import styles from "../src/styles/Dashboard.module.scss";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const router = useRouter();
  useIsAdmin();
  useEffect(() => {
    if (router.pathname === "/dashboard") router.push("/dashboard/add");
  }, [router]);

  return (
    <Layout variant={"main-center"}>
      <div className="container__dashboard">
        <Menu title={"Menu"} />
        <div className={styles.container}>{children}</div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Dashboard);
