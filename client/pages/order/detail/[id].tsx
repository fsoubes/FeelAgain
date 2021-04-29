import React from "react";
import { Layout } from "../../../src/components/Layout";
import { withApollo } from "../../../src/utils/withApollo";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface Props {
  id?: string;
}

const DetailOrder: NextPage<Props> = ({ id }) => {
  const router = useRouter();

  return (
    <Layout>
      <h1>Commandes</h1>
    </Layout>
  );
};

DetailOrder.getInitialProps = ({ query: { id } }) => {
  if (id?.length === 24) {
    return { id: id as string };
  } else {
    return { id: "" };
  }
};

export default withApollo({ ssr: true })(DetailOrder);
