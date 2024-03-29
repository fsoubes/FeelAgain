import { useEffect, useState, Fragment } from "react";
import { NextPage } from "next";
import ShoesForm from "../../../components/Dashboard/ShoesForm";
import SubTabs from "../../../components/SubTabs/SubTabs";
import { useGetDashboardShoesQuery } from "../../../generated/graphql";
import styles from "../../../styles/Dashboard.module.scss";
import { paletteShoes } from "../../../constants/constants";

interface UpdateProductProps {
  id?: string;
  content?: string;
}

const UpdateProduct: NextPage<UpdateProductProps> = ({ id, content }) => {
  const { data } = useGetDashboardShoesQuery({
    variables: { shoesId: id },
    fetchPolicy: "network-only",
  });

  const [shoes, setShoes] = useState<any>("");

  useEffect(() => {
    if (data) {
      const regex = /.cm$/g;
      let { images, variants, relatives, ...shoes } = data.getSingleShoe;
      const updatedSize = shoes.size.slice();
      const updateVariant = updatedSize.sort((a, b) => a - b);
      const updatedVariants = variants
        .slice()
        .sort(
          (a, b) =>
            updatedSize.indexOf(parseFloat(a.title)) -
            updatedSize.indexOf(parseFloat(b.title))
        );

      const heel = parseFloat(shoes.tags.filter((item) => regex.test(item))[0]);
      const colors = shoes.tags.filter(
        (item) => paletteShoes.indexOf(item) !== -1
      );
      const material = shoes.tags.filter(
        (item) => !regex.test(item) && paletteShoes.indexOf(item) === -1
      );

      setShoes({
        ...shoes,
        images,
        relatives,
        colors: colors,
        tags: material,
        initialtags: shoes.tags,
        heel: heel ? heel : 0,
        variants: updatedVariants,
        size: updateVariant,
      });
    }
  }, [data]);

  const currentContent = ["general", "images", "variants"];
  const [current, setCurrent] = useState(
    content ? currentContent.indexOf(content) : 0
  );

  return (
    <Fragment>
      <div className={styles.header}>
        <h1 style={{ width: "100%" }}>Modifier un produit</h1>
      </div>
      <SubTabs
        title={["General", "Images", "Variants"]}
        value={current}
        change={setCurrent}
        currentContent={currentContent}
        path={`/dashboard/update/${id}`}
      />
      {shoes && <ShoesForm current={current} fetchValues={shoes} />}
    </Fragment>
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
