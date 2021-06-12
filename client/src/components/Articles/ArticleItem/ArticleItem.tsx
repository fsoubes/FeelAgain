import Link from "next/link";
import { Button } from "@material-ui/core";

interface ArticleItemProps {
  title: String;
  styles: {
    readonly [key: string]: string;
  };
  description: String | undefined | null;
  author: String;
  id: String;
  ago?: String;
  visual?: String;
  isBlog: Boolean;
  tags: String;
}

const ArticleItem: React.FC<ArticleItemProps> = ({
  title,
  styles,
  description,
  author,
  id,
  ago,
  visual,
  isBlog,
  tags,
}) => {
  return (
    <section
      className={styles.articles__container_item}
      style={{ width: "100%" }}
    >
      <div className={styles.tag__container}>
        <div className={`${styles.tag} ${styles[tags as string]}`}>{tags}</div>
      </div>
      <div className={styles.articles__container_title}>
        <Link href={isBlog ? `/article/${id}` : `/dashboard/update/blog/${id}`}>
          <h2>{title}</h2>
        </Link>
        <div className={styles.articles__author}>
          <span>
            Posté par {author} - {ago}
          </span>
          <span>2 commentaires</span>
        </div>
      </div>

      <div className={styles.articles__image}>
        <Link href={isBlog ? `/article/${id}` : `/dashboard/update/blog/${id}`}>
          {visual && (
            <img
              loading="lazy"
              src={visual as string}
              width="374"
              height="211"
              alt="visual__article"
            ></img>
          )}
        </Link>
      </div>
      <div className={styles.articles__description}>
        <p>{description}</p>
        <Link href={isBlog ? `/article/${id}` : `/dashboard/update/blog/${id}`}>
          <Button disableRipple>Lire la suite »</Button>
        </Link>
      </div>
    </section>
  );
};
export default ArticleItem;
