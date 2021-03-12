import React from "react";
import { Layout } from "../../src/components/Layout";
import { useIsAdmin } from "../../src/utils/useIsAdmin";
import { withApollo } from "../../src/utils/withApollo";

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
