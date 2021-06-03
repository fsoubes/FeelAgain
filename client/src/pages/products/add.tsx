import React from "react";
import { Layout } from "../../components/Layout";
import { useIsAdmin } from "../../utils/useIsAdmin";
import { withApollo } from "../../utils/withApollo";

interface AddProps {}

const AddShoes: React.FC<AddProps> = ({}) => {
  useIsAdmin();
  return (
    <Layout>
      <div>Hello Dear Admin</div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(AddShoes);
