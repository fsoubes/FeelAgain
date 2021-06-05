import { NextPage } from "next";
import { useState, Fragment } from "react";
import ShoesForm from "../../components/Dashboard/ShoesForm";
import SubTabs from "../../components/SubTabs/SubTabs";
import styles from "../../styles/Dashboard.module.scss";

interface AddProps {
  content?: string;
}

const AddProduct: NextPage<AddProps> = ({ content }) => {
  const currentContent = ["general", "images", "variants"];
  const [current, setCurrent] = useState(
    content ? currentContent.indexOf(content) : 0
  );

  return (
    <Fragment>
      <div className={styles.header}>
        <h1 style={{ width: "100%" }}>Ajouter un produit</h1>
      </div>
      <SubTabs
        title={["General", "Images", "Variants"]}
        value={current}
        change={setCurrent}
        currentContent={currentContent}
        path={"/dashboard/add"}
      />
      <ShoesForm current={current} />
    </Fragment>
  );
};

AddProduct.getInitialProps = async ({ query: { content } }) => {
  return { content: content as string };
};

export default AddProduct;
