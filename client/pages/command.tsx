import React from "react";
import { Layout } from "../src/components/Layout";
import { withApollo } from "../src/utils/withApollo";

interface CommandProps {}

const Command: React.FC<CommandProps> = ({}) => {
  return (
    <Layout>
      <h1>Command</h1>
    </Layout>
  );
};
export default withApollo({ srr: false })(Command);
