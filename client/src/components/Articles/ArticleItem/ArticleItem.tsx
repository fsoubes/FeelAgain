import React from "react";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { themes } from "../../../constants/constants";

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
}) => {
  return (
    <section
      className={styles.articles__container_item}
      style={{ width: "100%" }}
    >
      <div className={styles.articles__container_title}>
        <Link href={isBlog ? `/article/${id}` : `/dashboard/update/blog/${id}`}>
          <h2>{title}</h2>
        </Link>
        <div className={styles.articles__author}>
          <span>
            Posté par {author} - {ago}
          </span>
          <div className={styles.tag}>
            {themes[Math.floor(Math.random() * (themes as string[]).length)]}
          </div>
        </div>
      </div>

      <div className={styles.articles__image}>
        <Link href={isBlog ? `/article/${id}` : `/dashboard/update/blog/${id}`}>
          <img
            loading="lazy"
            src={visual as string}
            width="374"
            height="211"
            alt="visual__article"
          ></img>
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
