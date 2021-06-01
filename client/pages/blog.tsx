import { Layout } from "../src/components/Layout";
import { useGetArticlesQuery } from "../src/generated/graphql";
import ArticleList from "../src/components/Articles/ArticleList";
import styles from "../src/styles/Home.module.scss";
import { Button } from "@material-ui/core";
import * as Carousel from "../src/components/Carousel/index";
import { withApollo } from "../src/utils/withApollo";
import React from "react";
import Link from "next/link";
import { themes } from "../src/components/Articles/ArticleItem/ArticleItem";

const Blog: React.FC = ({}) => {
  const { data, loading, variables, fetchMore } = useGetArticlesQuery({
    variables: { limit: 9, cursor: null },
    notifyOnNetworkStatusChange: true,
  });

  const carousel = Array(2)
    .fill(null)
    .map((__, index) => {
      return (
        <Carousel.Slide key={index}>
          <div className={styles.grid__carousel}>
            {data?.getArticles?.edges
              .slice(index === 0 ? 0 : 4, index === 0 ? 4 : 8)
              .map((item) => {
                return (
                  <Link href={`article/${item._id}`} key={item._id}>
                    <div
                      className={styles.grid__item}
                      style={{
                        backgroundImage: `url(${item.image_url as string})`,
                      }}
                    >
                      <div className={styles.thumb__overlay}>
                        <span className={styles.thumb__categories}>
                          <div className={styles.post__cat}>
                            {
                              themes[
                                Math.floor(
                                  Math.random() * (themes as string[]).length
                                )
                              ]
                            }
                          </div>
                        </span>
                        <div className={styles.thumb__content}>
                          <h2>{item.title}</h2>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </Carousel.Slide>
      );
    });

  return (
    <Layout variant="main">
      <div className={styles.home__container}>
        {!data && loading ? (
          <div>Loading ...</div>
        ) : (
          <>
            <section>
              <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
                Dernier articles
              </h1>
              <Carousel.Component
                options={{
                  perView: 1,
                  focusAt: "center",
                  type: "carousel",
                }}
              >
                {carousel}
              </Carousel.Component>
            </section>
            <div className={styles.articles__container}>
              <ArticleList articles={data!.getArticles.edges} styles={styles} />
              {data && data.getArticles.pageInfo.hasNextPage && (
                <Button
                  onClick={() => {
                    fetchMore({
                      variables: {
                        limit: variables?.limit,
                        cursor: data?.getArticles.pageInfo.endCursor,
                      },
                    });
                  }}
                >
                  Charger plus
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Blog);
