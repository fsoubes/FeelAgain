import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useGetSingleShoesQuery } from "../../generated/graphql";
import styles from "../../styles/Product.module.scss";
import AddToCart from "../Button/AddToCart";
import SelectRelative from "../Select/SelectRelative";
import SelectSize from "../Select/SelectSize";

interface Info {
  title: string;
  product: string;
}

interface ProdutDetailProps {
  id: string;
  setOpenCard: any;
  setInfo: React.Dispatch<React.SetStateAction<Info>>;
}

const getMarkdown = (innerHtml: any) => {
  return { __html: innerHtml };
};

const ProdutDetail: React.FC<ProdutDetailProps> = ({
  id,
  setOpenCard,
  setInfo,
}) => {
  const [index, setIndex] = useState<number>(0);

  const { data } = useGetSingleShoesQuery({
    variables: { shoesId: id },
    skip: !id,
  });

  useEffect(() => {
    if (data) {
      setInfo({
        title: data?.getSingleShoe.title,
        product: data?.getSingleShoe.product_type,
      });
    }
  }, [data]);

  return (
    <div className={styles.main}>
      <div className={styles.images}>
        <img src={data?.getSingleShoe.images[0].src} alt="product image"></img>
      </div>
      <div className={styles.content__container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>{data?.getSingleShoe.title}</h1>
          </div>
          <div className={styles.form}>
            <div className={styles.price}>
              <h1 style={{ textAlign: "center", paddingTop: "1rem" }}>
                {data?.getSingleShoe?.price}€
              </h1>
            </div>
            {data && (
              <SelectSize
                sizes={data?.getSingleShoe?.size as number[]}
                setIndex={setIndex}
                variants={data?.getSingleShoe.variants}
              ></SelectSize>
            )}
            {data?.getSingleShoe?.relatives &&
              data?.getSingleShoe?.relatives?.length > 0 && (
                <SelectRelative
                  title={data?.getSingleShoe?.title}
                  data={[
                    {
                      title: data?.getSingleShoe?.title,
                      _id: data?.getSingleShoe?._id,
                    },
                    ...data?.getSingleShoe?.relatives,
                  ]}
                />
              )}

            {data?.getSingleShoe.variants &&
            data?.getSingleShoe?.variants[index].quantity === 0 ? (
              <Button disableRipple className={styles.nocard}>
                Pointure non disponible
              </Button>
            ) : (
              <AddToCart
                id={data?.getSingleShoe?.variants[index]._id}
                setOpenCard={setOpenCard}
              ></AddToCart>
            )}
          </div>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={getMarkdown(data?.getSingleShoe.body_html)}
          />
        </div>
      </div>
    </div>
  );
};
export default React.memo(ProdutDetail);
