import React, { useEffect } from "react";
import { Layout } from "../../src/components/Layout";
import { useGetSingleArticleQuery } from "../../src/generated/graphql";
import { withApollo } from "../../src/utils/withApollo";
import { NextPage } from "next";
import { useRouter } from "next/router";
import VoteRating from "../../src/components/Votes/VoteRating";
import styles from "../../src/styles/Article.module.scss";

interface Props {
  id?: string;
}

const Article: NextPage<Props> = ({ id }) => {
  const router = useRouter();
  const { data } = useGetSingleArticleQuery({
    variables: { articleId: id },
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
            <h1>{data?.getSingleArticle.title}</h1>
            Posted by {data?.getSingleArticle.author.nickname} - &nbsp;
            {data?.getSingleArticle.createdAt}
          </div>
          <VoteRating
            total={data?.getSingleArticle.totalVoting}
            authRating={data?.getSingleArticle.authRating}
            articleId={data?.getSingleArticle._id}
          />
        </div>
        <div className={styles.article__content}>
          <p>{data?.getSingleArticle.article}</p>
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
