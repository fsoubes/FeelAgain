import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import React, { useState } from "react";
import ShoesForm from "../../src/components/Dashboard/ShoesForm";
import SubTabs from "../../src/components/SubTabs/SubTabs";
import { useAddArticleMutation } from "../../src/generated/graphql";
import styles from "../../src/styles/Dashboard.module.scss";

interface AddProps {
  content?: string;
}

const AddProduct: NextPage<AddProps> = ({ content }) => {
  const currentContent = ["general", "images", "variants"];
  const [addArticle] = useAddArticleMutation();
  const [current, setCurrent] = useState(
    content ? currentContent.indexOf(content) : 0
  );

  return (
    <div className={styles.dashboard__container}>
      <div>
        <div className={styles.dashboard__header}>
          <h1 style={{ width: "100%" }}>Ajouter un produit</h1>
        </div>
        <SubTabs
          title={["General", "Images", "Variants"]}
          value={current}
          change={setCurrent}
          currentContent={currentContent}
        />

        <ShoesForm current={current} />
      </div>
    </div>
  );
};

AddProduct.getInitialProps = async ({ query: { content } }) => {
  return { content: content as string };
};

export default AddProduct;
