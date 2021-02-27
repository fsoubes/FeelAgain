import { withApollo } from "../src/utils/withApollo";
import { Layout } from "../src/components/Layout";
import { useGetArticlesQuery } from "../src/generated/graphql";
import ArticleList from "../src/components/Articles/ArticleList";
import styles from "../src/styles/Home.module.scss";
import { Button } from "@material-ui/core";

const Home: React.FC = ({}) => {
  const { data, loading, variables, fetchMore } = useGetArticlesQuery({
    variables: { limit: 10, cursor: null },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Layout variant="main">
      <div className={styles.home__container}>
        {!data && loading ? (
          <div>Loading ...</div>
        ) : (
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
                Load More
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Home);
