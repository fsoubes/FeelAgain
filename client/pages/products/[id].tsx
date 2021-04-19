import React, { useEffect, useState } from "react";
import { Layout } from "../../src/components/Layout";
import { useGetClosestShoesQuery, Shoes } from "../../src/generated/graphql";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../src/styles/Product.module.scss";
import Outside from "../../src/components/OutsideEvent/Outside";
import ProductListDash from "../../src/components/Dashboard/Product/ProductList";
import CartSideBar from "../../src/components/SideBar/CartSideBar";
import CartProduct from "../../src/components/Cart/CartProduct";
import BackDropShadow from "../../src/components/BackDrop/BackDropShadow";
import { withApollo } from "../../src/utils/withApollo";
import SmallCartProduct from "../../src/components/Cart/SmallCartProduct";
import ProdutDetail from "../../src/components/Products/ProdutDetail";

interface Props {
  id?: string;
}

interface Info {
  title: string;
  product: string;
}

const Article: NextPage<Props> = ({ id }) => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState<Boolean>(false);
  const [info, setInfo] = useState<Info>({ title: "", product: "" });
  const [productId, setProductId] = useState("");

  const { data: dataClosest } = useGetClosestShoesQuery({
    variables: {
      product: info.product,
      title: info.title,
    },
    skip: !info.title || (openCard as boolean),
  });

  useEffect(() => {
    if (!id) {
      router.push("/404");
    } else {
      setProductId(id);
    }
  }, [id]);

  return (
    <Layout>
      {openCard && <BackDropShadow></BackDropShadow>}
      <Outside open={openCard} setOpen={setOpenCard}>
        <CartSideBar isOpen={openCard}>
          <CartProduct setOpen={setOpenCard} isOpen={openCard}>
            <SmallCartProduct />
          </CartProduct>
        </CartSideBar>
      </Outside>
      <div className="container__shop">
        <ProdutDetail
          id={productId as string}
          setOpenCard={setOpenCard}
          setInfo={setInfo}
        />
        <br />
        <div className={styles.neighbours}>
          <h1>Chaussures que vous pourriez aimer</h1>
          {dataClosest && dataClosest?.getClosestShoes && (
            <div>
              <ProductListDash
                isTilt={false}
                isProduct={true}
                shoes={dataClosest?.getClosestShoes as Shoes[]}
              ></ProductListDash>
            </div>
          )}
        </div>
      </div>
      <div className={styles.comments}>
        <h1>Commentaires client</h1>
      </div>
    </Layout>
  );
};

Article.getInitialProps = ({ query: { id } }) => {
  if (id?.length === 24) {
    return { id: id as string };
  } else {
    return { id: "" };
  }
};

export default withApollo({ ssr: true })(Article);
