import React, { useState } from "react";
import { Layout } from "../../../src/components/Layout";
import { withApollo } from "../../../src/utils/withApollo";
import { NextPage } from "next";
import { useGetMinShoesQuery } from "../../../src/generated/graphql";
import styles from "../../../src/styles/Comment.module.scss";
import { Button } from "@material-ui/core";
import RatingIcon from "../../../src/components/StarRating/Rating";

interface Props {
  id?: string;
}

const CommentOrder: NextPage<Props> = ({ id }) => {
  const { data } = useGetMinShoesQuery({ variables: { shoesId: id } });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const onMouseEnter = (index: number) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index: number) => {
    setRating(index);
  };

  const handleClick = async () => {
    return null;
  };

  return (
    <Layout>
      <div className="container__small">
        <div className={styles.container}>
          <h1>Créer un commentaire</h1>
          {data && (
            <div className={styles.header}>
              <div className={styles.top__image}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url( ${
                      data.getSingleShoe.vendor === "Anaki"
                        ? data.getSingleShoe.images[1].src
                        : data.getSingleShoe.images[0].src
                    } )`,
                    backgroundSize:
                      data.getSingleShoe.vendor === "Anaki"
                        ? "contain"
                        : "cover",
                  }}
                ></div>
              </div>
              <h4>{data.getSingleShoe.title}</h4>
            </div>
          )}

          <div className={styles.rating}>
            <h3>Note générale</h3>
            <div style={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map((index) => {
                return (
                  <RatingIcon
                    key={index}
                    index={index}
                    rating={rating}
                    hoverRating={hoverRating}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onSaveRating={onSaveRating}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.add__photo}>
            <h3>Ajouter une photo</h3>
            <div className={styles.input}>
              <input></input>
            </div>
          </div>
          <div className={styles.add__title}>
            <h3>Ajouter un titre</h3>
            <div className={styles.input}>
              <input placeholder={"Une information majeure"}></input>
            </div>
          </div>
          <div className={styles.add__comment}>
            <h3>Ajouter un commentaire écrit</h3>
            <div className={styles.input}>
              <textarea
                placeholder={"Un commentaire sur le produit"}
              ></textarea>
            </div>
          </div>
          <div className={styles.action}>
            <Button onClick={handleClick}>Envoyer</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

CommentOrder.getInitialProps = ({ query: { id } }) => {
  if (id?.length === 24) {
    return { id: id as string };
  } else {
    return { id: "" };
  }
};

export default withApollo({ ssr: false })(CommentOrder);
