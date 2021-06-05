import { Button } from "@material-ui/core";
import ArticleList from "../../../../components/Articles/ArticleList";
import Spinner from "../../../../components/Spinner/Spinner";
import { useGetArticlesQuery } from "../../../../generated/graphql";
import styles from "../../../../styles/Home.module.scss";

interface LatestProps {}

const Latest: React.FC<LatestProps> = ({}) => {
  const { data, loading, variables, fetchMore } = useGetArticlesQuery({
    variables: { limit: 9, cursor: null },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div className={styles.home__container}>
      {!data && loading ? (
        <div>
          <Spinner></Spinner>
        </div>
      ) : (
        <div className={styles.articles__container}>
          <ArticleList
            articles={data!.getArticles.edges}
            styles={styles}
            isBlog={false}
          />
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
      )}
    </div>
  );
};
export default Latest;
