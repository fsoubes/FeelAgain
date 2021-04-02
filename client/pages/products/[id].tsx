import React, { useEffect } from "react";
import { Layout } from "../../src/components/Layout";
import { useGetSingleShoesQuery } from "../../src/generated/graphql";
import { withApollo } from "../../src/utils/withApollo";
import { NextPage } from "next";
import { useRouter } from "next/router";
// import VoteRating from "../../src/components/Votes/VoteRating";
import styles from "../../src/styles/Product.module.scss";

interface Props {
  id?: string;
}

const getMarkdown = (innerHtml: any) => {
  return { __html: innerHtml };
};

const Article: NextPage<Props> = ({ id }) => {
  const router = useRouter();
  const { data } = useGetSingleShoesQuery({
    variables: { shoesId: id },
  });

  useEffect(() => {
    if (!id) {
      router.push("/404");
    }
  }, [id]);

  return (
    <Layout>
      <div className={styles.container__article}>
        <div className={styles.article__content}>
          <div>
            <img
              src={data?.getSingleShoe.images[0].src}
              height="550"
              width="500"
              alt="product image"
            ></img>
          </div>
          <div>
            <div className={styles.article__header}>
              <div>
                <h1>{data?.getSingleShoe.title}</h1>
                Vendor is {data?.getSingleShoe.vendor} - &nbsp;
                {data?.getSingleShoe.createdAt}
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={getMarkdown(
                data?.getSingleShoe.body_html
              )}
            />
          </div>
        </div>
        <br />
        <div>
          <h1>Vous aimerez aussi</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            eaque sit adipisci deleniti libero aliquam quae excepturi deserunt
            minima consequuntur? Numquam enim accusantium veniam similique optio
            sunt soluta modi unde!
          </p>
        </div>
      </div>
      <div>
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
