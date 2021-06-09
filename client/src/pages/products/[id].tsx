import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import {
  useGetClosestShoesQuery,
  Shoes,
  Comments,
} from "../../generated/graphql";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Product.module.scss";
import Outside from "../../components/OutsideEvent/Outside";
import ProductListDash from "../../components/Dashboard/Product/ProductList";
import CartSideBar from "../../components/SideBar/CartSideBar";
import CartProduct from "../../components/Cart/CartProduct";
import BackDropShadow from "../../components/BackDrop/BackDropShadow";
import { withApollo } from "../../utils/withApollo";
import SmallCartProduct from "../../components/Cart/SmallCartProduct";
import ProdutDetail from "../../components/Products/ProdutDetail";
import CommentsList from "../../components/Comments/CommentsList";
import ScoreShoes from "../../components/Score/ScoreShoes";
import Head from "../../components/SEO/Head";

interface Props {
  id?: string;
}

interface Info {
  title: string;
  product: string;
  comments: Comments[] | [];
  scored_by: number;
  score_1: number;
  score_2: number;
  score_3: number;
  score_4: number;
  score_5: number;
  score: number;
}

const Article: NextPage<Props> = ({ id }) => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState<Boolean>(false);
  const [info, setInfo] = useState<Info>({
    title: "",
    product: "",
    comments: [],
    scored_by: 0,
    score_1: 0,
    score_2: 0,
    score_3: 0,
    score_4: 0,
    score_5: 0,
    score: 0,
  });
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
    <Layout isBasket={openCard as boolean}>
      {info.product && info.title && (
        <Head title={info.title} product={info.product} />
      )}
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
        <div className={styles.comments}>
          <h1>Commentaires client</h1>
          <div className={styles.comments__container}>
            {info.comments && info.comments.length > 0 ? (
              <>
                <ScoreShoes
                  score_5={`${(info.score_5 / info.scored_by) * 100}%`}
                  score_4={`${(info.score_4 / info.scored_by) * 100}%`}
                  score_3={`${(info.score_3 / info.scored_by) * 100}%`}
                  score_2={`${(info.score_2 / info.scored_by) * 100}%`}
                  score_1={`${(info.score_1 / info.scored_by) * 100}%`}
                  score={info.score}
                  scored_by={info.scored_by}
                ></ScoreShoes>
                <CommentsList comments={info.comments}></CommentsList>
              </>
            ) : (
              <h3>Pas de commentaires actuellement</h3>
            )}
          </div>
        </div>
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
