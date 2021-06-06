import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Layout } from "../../components/Layout";
import { useGetSingleArticleQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { NextPage } from "next";
import { useRouter } from "next/router";
import VoteRating from "../../components/Votes/VoteRating";
import styles from "../../styles/Article.module.scss";
import { isServer } from "../../utils/isServer";
import { Link } from "@material-ui/core";
import ScrollStatus from "../../components/ScrollStatus/ScrollStatus";

const MarkdownSanitize = dynamic(
  () => import("../../components/Markdown/MarkdownSanitize"),
  {
    ssr: false,
  }
);

interface Props {
  id?: string;
}

const Article: NextPage<Props> = ({ id }) => {
  const router = useRouter();
  const { data } = useGetSingleArticleQuery({
    variables: { articleId: id },
    skip: isServer(),
  });

  const articleRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (!id) {
      router.push("/404");
    }
  }, [id]);

  return (
    <Layout>
      <ScrollStatus
        articleRef={articleRef as React.MutableRefObject<HTMLInputElement>}
      />
      <div
        className={styles.container}
        style={{
          backgroundImage: data?.getSingleArticle.image_back
            ? `url(${data?.getSingleArticle.image_back})`
            : "url(https://i.imgur.com/O3IUbtb.png)",
        }}
      >
        <div className={styles.tie__wrapper}>
          <div className={styles.container__header}>
            <header>
              <nav>
                <Link href="/">
                  <span className={styles.route__home}>Acceuil</span>
                </Link>
                <em className={styles.delimiter}>/</em>
                <Link href="/blog">
                  <span>Blog</span>
                </Link>
                <em className={styles.delimiter}>/</em>
                <span> {data?.getSingleArticle.title}</span>
              </nav>
            </header>
            <div className={styles.header_title}>
              <h1 className={styles.text_center}>
                {data?.getSingleArticle.title}
              </h1>
              {/* <VoteRating
                total={data?.getSingleArticle.totalVoting}
                authRating={data?.getSingleArticle.authRating}
                articleId={data?.getSingleArticle._id}
              /> */}

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  className={styles.header_useravatar}
                  style={{
                    backgroundImage: `url( ${"/feelogo.png"} )`,
                  }}
                ></div>
              </div>
            </div>
            <div className={styles.header_username}>
              {data?.getSingleArticle.author.nickname}
            </div>
            <div className={styles.header__info}>
              <span style={{ marginRight: "12px" }}>18 mars 2021</span>
              <div>
                <span className={styles.info__comments}>0</span>
                <span className={styles.info__fame}>548</span>
                <span className={styles.info__read}> 5 minutes de lecture</span>
              </div>
            </div>

            <Link href="#content" className={styles.go__to__content}>
              <span className={styles.angle__down}></span>
            </Link>
          </div>
          <div className={styles.container__content}>
            <div id="content" className={styles.content}>
              <article>
                <div className={styles.visual__container}>
                  <figure className={styles.visual__content}>
                    <img
                      loading="lazy"
                      src={data?.getSingleArticle.image_url as string}
                      alt="visual article"
                      width="1280"
                      height="720"
                    ></img>
                  </figure>
                </div>
                <div
                  ref={articleRef as React.MutableRefObject<HTMLInputElement>}
                >
                  <MarkdownSanitize
                    isPreview={false}
                    source={data?.getSingleArticle.article}
                  />
                </div>
              </article>
            </div>
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
