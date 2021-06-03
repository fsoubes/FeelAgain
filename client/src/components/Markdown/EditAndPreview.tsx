import React, { useState, Fragment } from "react";
import Markdown from "./Markdown";
import dynamic from "next/dynamic";

const MarkdownSanitize = dynamic(() => import("./MarkdownSanitize"), {
  ssr: false,
});
import styles from "../../styles/EditAndPreview.module.scss";

interface EditAndPreviewProps {
  data?: string | undefined;
}

const EditAndPreview: React.FC<EditAndPreviewProps> = ({ data }) => {
  const [value, setValue] = useState("");

  return (
    <Fragment>
      <Markdown data={data} setValue={setValue} />
      <div className={styles.preview__container}>
        <label>Preview:</label>
        <div className={styles.preview__header}>
          <div className={styles.preview__img_container}>
            <img alt="avatar" src={"/feelogo.png"}></img>
          </div>
          <div>FeelAgain</div>
        </div>
        <MarkdownSanitize source={value} />
      </div>
    </Fragment>
  );
};
export default EditAndPreview;
