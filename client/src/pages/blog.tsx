import { Layout } from "../components/Layout";
import { useGetArticlesQuery } from "../generated/graphql";
import ArticleList from "../components/Articles/ArticleList";
import styles from "../styles/Blog.module.scss";
import { Button } from "@material-ui/core";
import * as Carousel from "../components/Carousel/index";
import { withApollo } from "../utils/withApollo";
import Link from "next/link";
import useResponsive from "../utils/useResponsive";
import Head from "../components/SEO/Head";
import Spinner from "../components/Spinner/Spinner";

const emptyFill = {
  _id: "",
  tags: "",
  title: "",
  image_url: "",
  article: "",
  author: {
    nickname: "",
  },
};

const Blog: React.FC = ({}) => {
  const { data, loading, variables, fetchMore } = useGetArticlesQuery({
    variables: { limit: 9, cursor: null },
    notifyOnNetworkStatusChange: true,
  });

  const { isTabletorMobile } = useResponsive();

  const carousel = Array(2)
    .fill(null)
    .map((__, index) => {
      return (
        <Carousel.Slide key={index}>
          <div className={styles.grid__carousel}>
            {data?.getArticles.edges
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
                          <div
                            className={`${styles.post__cat} ${
                              styles[item.tags as string]
                            }`}
                          >
                            {item.tags}
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
      <Head
        title={"Découvrez l'univers feelagain avec nos articles"}
        description={
          "Articles proposés par FeelAgain incluant différentes thématiques technologies, sport, lecture, musique, mode"
        }
      />
      <div className={styles.home__container}>
        {!data && loading ? (
          <>
            <section>
              <Spinner />
            </section>
            <div className={styles.articles__container}>
              <ArticleList
                articles={Array(9).fill(emptyFill)}
                styles={styles}
              />
            </div>
          </>
        ) : (
          <>
            <section>
              <Carousel.Component
                options={{
                  perView: 1,
                  focusAt: "center",
                  type: "carousel",
                  swipeThreshold: isTabletorMobile,
                  dragThreshold: isTabletorMobile,
                }}
                isLanding={false}
                isTabletorMobile={isTabletorMobile}
              >
                {carousel}
              </Carousel.Component>
            </section>
            <div className={styles.articles__container}>
              <ArticleList articles={data!.getArticles.edges} styles={styles} />
              {data && data.getArticles.pageInfo.hasNextPage && (
                <div className={styles.load__more}>
                  <Button
                    disableRipple
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
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Blog);
