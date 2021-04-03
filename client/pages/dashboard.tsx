import React from "react";
import { Layout } from "../src/components/Layout";
import { withApollo } from "../src/utils/withApollo";
import Menu from "../src/components/Admin/Menu";
import { useIsAdmin } from "../src/utils/useIsAdmin";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  useIsAdmin();
  return (
    <Layout variant={"main-center"}>
      <div className="container__dashboard">
        <Menu title={"Menu"} />
        {children}
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Dashboard);
