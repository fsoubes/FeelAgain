import React, { useEffect, useState, Fragment } from "react";
import { NextPage } from "next";
import { useGetSingleArticleQuery } from "../../../../generated/graphql";
import styles from "../../../../styles/Dashboard.module.scss";
import { isServer } from "../../../../utils/isServer";
import Modify from "../../../../components/Dashboard/Blog/BlogForm";

interface UpdateProductProps {
  id?: string;
  content?: string;
}

const UpdateProduct: NextPage<UpdateProductProps> = ({ id, content }) => {
  const { data } = useGetSingleArticleQuery({
    variables: { articleId: id },
    skip: isServer(),
  });

  const [blog, setBlog] = useState<any>("");

  useEffect(() => {
    if (data) {
      setBlog({
        ...data.getSingleArticle,
      });
    }
  }, [data]);

  console.log(blog);

  return (
    <Fragment>
      {blog && <Modify title={"Modifier un article"} fetchValues={blog} />}
    </Fragment>
  );
};

UpdateProduct.getInitialProps = ({ query: { id, content } }) => {
  if (id?.length === 24) {
    return { id: id as string, content: content as string };
  } else {
    return { id: "", content: "" };
  }
};

export default UpdateProduct;
