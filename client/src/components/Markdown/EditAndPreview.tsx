import React, { Fragment } from "react";
import Markdown from "./Markdown";
import dynamic from "next/dynamic";

const MarkdownSanitize = dynamic(() => import("./MarkdownSanitize"), {
  ssr: false,
});
import styles from "../../styles/EditAndPreview.module.scss";

interface EditAndPreviewProps {
  data?: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  article?: string;
  isPreview?: boolean;
}

const EditAndPreview: React.FC<EditAndPreviewProps> = ({
  data,
  setValue,
  article,
  isPreview = false,
}) => {
  return (
    <Fragment>
      <Markdown
        data={data ? data : article ? article : undefined}
        setValue={setValue}
      />
      <div className={styles.preview__container}>
        <label>Preview:</label>
        <div className={styles.preview__header}>
          <div className={styles.preview__img_container}>
            <img alt="avatar" src={"/feelogo.png"}></img>
          </div>
          <div>FeelAgain</div>
        </div>
        <MarkdownSanitize isPreview={isPreview} source={article} />
      </div>
    </Fragment>
  );
};
export default EditAndPreview;
