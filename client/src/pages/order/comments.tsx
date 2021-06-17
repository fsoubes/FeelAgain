import { NextPage } from "next";
import { Layout } from "../../components/Layout";
import { useGetPurchasesQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import styles from "../../styles/CommentPurchases.module.scss";
import PurchasesItem from "../../components/Purchases/PurchasesItem";

interface ProductsToCommentProps {
  id?: string;
  itemId?: string;
  thanks?: string;
}

const ProductsToComment: NextPage<ProductsToCommentProps> = ({ thanks }) => {
  const { data } = useGetPurchasesQuery({ fetchPolicy: "network-only" });

  return (
    <Layout>
      <div className="container__small">
        {thanks && (
          <div className={styles.thanks__container}>
            <div className={styles.thanks__inner}>
              <h3>Commentaire envoyé - Merci !</h3>
              <span>
                Votre commentaire est en cours de traitement. Cela peut prendre
                plusieurs jours, nous apprécions donc votre patience. Nous vous
                informerons lorsque cette opération sera terminée. Jusqu’alors,
                vous pouvez toujours modifier votre avis.
              </span>
            </div>
          </div>
        )}
        <h1>Évaluez vos achats</h1>
        <div style={{ width: "100%" }}>
          {data && data.getPurchases && (
            <ul className={styles.purchases__list}>
              {data.getPurchases.map((item) => {
                return (
                  <PurchasesItem
                    key={item.product.shoes._id}
                    title={item.product.shoes.title}
                    shoesId={item.product.shoes._id}
                    itemId={item._id}
                    reviewId={item.comment?._id}
                    src={
                      item.product.shoes.vendor === "Anaki"
                        ? item.product.shoes.images[1].src
                        : item.product.shoes.images[0].src
                    }
                    currentRating={item.comment?.score ? item.comment.score : 0}
                    contains={item.product.shoes.vendor === "Anaki"}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

ProductsToComment.getInitialProps = ({ query: { id, item, thanks } }) => {
  return {
    id: id as string,
    itemId: item as string,
    thanks: thanks as string,
  };
};

export default withApollo({ ssr: false })(ProductsToComment);
