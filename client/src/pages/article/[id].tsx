import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Layout } from "../../components/Layout";
import {
  useGetClosestArticlesQuery,
  useGetSingleArticleQuery,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { NextPage } from "next";
import { useRouter } from "next/router";
import VoteRating from "../../components/Votes/VoteRating";
import styles from "../../styles/Article.module.scss";
import { isServer } from "../../utils/isServer";
import { Button, Link } from "@material-ui/core";
import ScrollStatus from "../../components/ScrollStatus/ScrollStatus";
import Head from "../../components/SEO/Head";

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

  const { data: closest } = useGetClosestArticlesQuery({
    variables: {
      title: data?.getSingleArticle.title as string,
      tags: data?.getSingleArticle.tags as string,
    },
    skip: !data?.getSingleArticle,
  });

  const articleRef = useRef<HTMLInputElement>();
  const commentRef = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (!id) {
      router.push("/404");
    }
  }, [id]);

  return (
    <Layout>
      {data && data.getSingleArticle && (
        <Head
          title={data.getSingleArticle.title}
          description={data.getSingleArticle.description as string}
          tags={data.getSingleArticle.tags as string}
        />
      )}
      <ScrollStatus
        articleRef={articleRef as React.MutableRefObject<HTMLInputElement>}
      />
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${data?.getSingleArticle.image_back})`,
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

            <Link
              aria-label="top document"
              href="#content"
              className={styles.go__to__content}
            >
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
              <div className={styles.article__footer}>
                <div className={styles.similar__articles}>
                  <h3 style={{ color: "#ff4500" }}>Articles similaires</h3>
                  <div className={styles.similar__list}>
                    {closest?.getClosestArticles.map((item) => {
                      return (
                        <div className={styles.similar__item} key={item._id}>
                          <Link href={`/article/${item._id}`}>
                            <img
                              loading="lazy"
                              src={item.image_url as string}
                              alt="closest"
                            ></img>
                          </Link>
                          <h5>{item.title}</h5>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.comments}>
                  <h3>Commentaires</h3>
                </div>
                <div className={styles.form__comment}>
                  <h3>Laisser un avis</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      (commentRef.current as HTMLTextAreaElement).value = "";
                    }}
                  >
                    <label htmlFor="comment" style={{ display: "none" }}>
                      Commentaire
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      ref={commentRef as React.LegacyRef<HTMLTextAreaElement>}
                      rows={8}
                      required
                      cols={45}
                      maxLength={60000}
                    />
                    <Button name="submit" type="submit" disableRipple>
                      Laisser un avis
                    </Button>
                  </form>
                </div>
              </div>
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
