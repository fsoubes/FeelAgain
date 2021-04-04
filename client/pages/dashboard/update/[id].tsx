import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ShoesForm from "../../../src/components/Dashboard/ShoesForm";
import SubTabs from "../../../src/components/SubTabs/SubTabs";
import { useGetSingleShoesQuery } from "../../../src/generated/graphql";
import styles from "../../../src/styles/Dashboard.module.scss";

interface UpdateProductProps {
  id?: string;
  content?: string;
}

const UpdateProduct: NextPage<UpdateProductProps> = ({ id, content }) => {
  const { data } = useGetSingleShoesQuery({
    variables: { shoesId: id },
  });

  useEffect(() => {
    if (data) {
      const { images, ...shoes } = data.getSingleShoe;
      console.log(shoes);
    }
  }, [data]);

  const currentContent = ["general", "images", "variants"];
  const [current, setCurrent] = useState(
    content ? currentContent.indexOf(content) : 0
  );

  return (
    <div className={styles.dashboard__container}>
      <div>
        <div className={styles.dashboard__header}>
          <h1 style={{ width: "100%" }}>Modifier un produit</h1>
        </div>
        <SubTabs
          title={["General", "Images", "Variants"]}
          value={current}
          change={setCurrent}
          currentContent={currentContent}
          path={`/dashboard/update/${id}`}
        />
        {data && <ShoesForm current={current} data={data.getSingleShoe} />}
      </div>
    </div>
  );
};

UpdateProduct.getInitialProps = ({ query: { id, content } }) => {
  if (id?.length === 24) {
    return { id: id as string, content: content as string };
  } else {
    return { id: "", content: "" };
  }
};

export default UpdateProduct;
