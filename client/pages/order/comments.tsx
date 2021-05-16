import { NextPage } from "next";
import React from "react";
import { Layout } from "../../src/components/Layout";
import { useGetCartItemsQuery } from "../../src/generated/graphql";
import { withApollo } from "../../src/utils/withApollo";
import styles from "../../src/styles/CommentPurchases.module.scss";
import PurchasesItem from "../../src/components/Purchases/PurchasesItem";

interface ProductsToCommentProps {
  id?: string;
  itemId?: string;
  thanks?: string;
}

const ProductsToComment: NextPage<ProductsToCommentProps> = ({ thanks }) => {
  console.log(thanks);

  const { data } = useGetCartItemsQuery();

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
        <div>
          {data && (
            <ul className={styles.purchases__list}>
              {data.getCartItems.map((item) => {
                return (
                  <PurchasesItem
                    key={item.variant.shoes._id}
                    title={item.variant.shoes.title}
                    itemId={item._id}
                    shoesId={item.variant.shoes._id}
                    reviewId={item.comments?._id}
                    src={
                      item.variant.shoes.vendor === "Anaki"
                        ? item.variant.shoes.images[1].src
                        : item.variant.shoes.images[0].src
                    }
                    currentRating={
                      item.comments?.score ? item.comments.score : 0
                    }
                    contains={item.variant.shoes.vendor === "Anaki"}
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
