import React from "react";
import NextHead from "next/head";

interface HeadProps {
  title: string;
  description?: string;
  product?: string;
  tags?: string;
}

const Head: React.FC<HeadProps> = ({ title, description, product, tags }) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title}</title>
    <meta name="description" content={description || ""} />
    <meta name="product" content={product || ""} />
    <meta name="tags" content={tags || ""} />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
      key="viewport"
    />
  </NextHead>
);

export default Head;
