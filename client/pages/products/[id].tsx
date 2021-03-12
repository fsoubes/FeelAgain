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
        <div className={styles.article__header}>
          <div>
            <h1>{data?.getSingleShoe.title}</h1>
            Vendor is {data?.getSingleShoe.vendor} - &nbsp;
            {data?.getSingleShoe.createdAt}
          </div>
          {/* <VoteRating
            total={data?.getSingleShoe.totalVoting}
            authRating={data?.getSingleShoe.authRating}
            articleId={data?.getSingleShoe._id}
          /> */}
        </div>
        <div className={styles.article__content}>
          <img
            src={data?.getSingleShoe.images[0].src}
            height="400"
            width="400"
            alt="product image"
          ></img>
          <div
            dangerouslySetInnerHTML={getMarkdown(data?.getSingleShoe.body_html)}
          />
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
