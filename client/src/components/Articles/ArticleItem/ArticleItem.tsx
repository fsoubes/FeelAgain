import React from "react";
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
}

export const themes = [
  "Sport",
  "Voyage",
  "Animaux",
  "Mode",
  "Musique",
  "Technologie",
  "Lecture",
];

const ArticleItem: React.FC<ArticleItemProps> = ({
  title,
  styles,
  description,
  author,
  id,
  ago,
  visual,
}) => {
  return (
    <section
      className={styles.articles__container_item}
      style={{ width: "100%" }}
    >
      <div className={styles.articles__container_title}>
        <Link href={`article/${id}`}>
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
        <Link href={`article/${id}`}>
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
        <Link href={`article/${id}`}>
          <Button disableRipple>Lire la suite »</Button>
        </Link>
      </div>
    </section>
  );
};
export default ArticleItem;
