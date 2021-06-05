import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { withApollo } from "../../../utils/withApollo";
import { NextPage } from "next";
import {
  useAddReviewMutation,
  useGetMinShoesQuery,
  useGetReviewQuery,
} from "../../../generated/graphql";
import styles from "../../../styles/Comment.module.scss";
import { Button } from "@material-ui/core";
import RatingIcon from "../../../components/StarRating/Rating";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  id?: string;
  itemId?: string;
}

const CommentOrder: NextPage<Props> = ({ id, itemId }) => {
  const { data } = useGetMinShoesQuery({ variables: { shoesId: id } });
  const { data: review } = useGetReviewQuery({
    variables: { shoesId: id as string },
  });
  const router = useRouter();
  const [addComment] = useAddReviewMutation();
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const onMouseEnter = (index: number) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index: number) => {
    setRating(index);
  };

  useEffect(() => {
    if (review) {
      setRating(review?.getReview.score as number);
    }
  }, [review]);

  const handleClick = async (id: string, itemId: string) => {
    if (!rating || !title || !comment) {
      return;
    }

    const { data } = await addComment({
      variables: {
        shoesId: id,
        itemId: itemId,
        comment: comment,
        score: rating,
        title: title,
        ...(review && review.getReview && { reviewId: review.getReview._id }),
      },
    });

    router.push({
      pathname: `/order/comments`,
      query: { thanks: data?.addReview },
    });
  };

  return (
    <Layout>
      <div className="container__small">
        <div className={styles.container}>
          <h1>Créer un commentaire</h1>
          {data && (
            <div className={styles.header}>
              <Link href={`/products/${data.getSingleShoe._id}`}>
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
              </Link>
              <Link href={`/products/${data.getSingleShoe._id}`}>
                <div style={{ cursor: "pointer" }}>
                  <h4>{data.getSingleShoe.title}</h4>
                </div>
              </Link>
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
              <input
                defaultValue={review?.getReview.title as string}
                placeholder={"Une information majeure"}
                onChange={(event) => setTitle(event?.target.value)}
              ></input>
            </div>
          </div>
          <div className={styles.add__comment}>
            <h3>Ajouter un commentaire écrit</h3>
            <div className={styles.input}>
              <textarea
                defaultValue={review?.getReview.comment as string}
                onChange={(event) => setComment(event?.target.value)}
                placeholder={"Un commentaire sur le produit"}
              ></textarea>
            </div>
          </div>
          <div className={styles.action}>
            <Button onClick={() => handleClick(id as string, itemId as string)}>
              Envoyer
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

CommentOrder.getInitialProps = ({ query: { id, item } }) => {
  if (id?.length === 24) {
    return { id: id as string, itemId: item as string };
  } else {
    return { id: "" };
  }
};

export default withApollo({ ssr: false })(CommentOrder);
