import React from "react";
import { Layout } from "../../components/Layout";
import { withApollo } from "../../utils/withApollo";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  return (
    <Layout>
      <div className="container__shop">
        <h1>Hello</h1>
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Profile);
