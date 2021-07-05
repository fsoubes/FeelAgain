import React from "react";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";
import styles from "../styles/Contact.module.scss";

interface ContactProps {}

const Contact: React.FC<ContactProps> = ({}) => {
  return (
    <Layout>
      <div className="container__shop">
        <h1>Contact</h1>
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Contact);
