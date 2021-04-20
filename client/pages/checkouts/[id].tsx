import React from "react";
import { Layout } from "../../src/components/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../../src/styles/Product.module.scss";

import { withApollo } from "../../src/utils/withApollo";

interface Props {
  id?: string;
}

const CheckOut: NextPage<Props> = ({ id }) => {
  const router = useRouter();
  return (
    <Layout>
      <h1> Paid</h1>
    </Layout>
  );
};

CheckOut.getInitialProps = ({ query: { id } }) => {
  if (id?.length === 24) {
    return { id: id as string };
  } else {
    return { id: "" };
  }
};

export default withApollo({ ssr: true })(CheckOut);
