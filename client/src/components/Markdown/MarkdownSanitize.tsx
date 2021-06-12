// React
import { memo } from "react";

// libs
import createDOMPurify from "dompurify";
import marked from "marked";

// CSS
import styles from "../../styles/MarkdownRender.module.scss";

// TODO EMOJI

interface RenderSanitizeProps {
  source: any;
  isPreview: boolean;
}

const RenderSanitize: React.FC<RenderSanitizeProps> = ({
  source,
  isPreview,
}) => {
  const clickHandler = (e: any) => {
    let el = e.target;
    if (el.parentNode.className === "youtube") {
      let newiframe = document.createElement("iframe");
      newiframe.src = `https://www.youtube.com/embed/${el.parentNode.id}?feature=oembed`;
      newiframe.width = "1120";
      newiframe.height = "686";
      newiframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      newiframe.allowFullscreen = true;
      let parentDiv = el.parentNode;
      let childDiv = parentDiv.firstChild;
      parentDiv.replaceChild(newiframe, childDiv);
    }
  };

  const getMarkdownText = (text: any) => {
    const DOMPurify = createDOMPurify(window);
    const config = {
      KEEP_CONTENT: false,
    };
    const clean = DOMPurify.sanitize(source, config);
    const addBr = clean.replace(/(?:\r\n|\r|\n)/g, "<br/>\n\n");

    return addBr;
  };

  // Get reference
  const renderer = new marked.Renderer({
    gfm: true,
    breaks: true,
  });

  // Override function
  renderer.heading = function(text, level) {
    let escapedText = text;
    const isCenter = /(§{2}(.*)§{2})/g;
    const isSpoiler = /(!{2}(.*)!{2})/g;

    if (text.match(isSpoiler)) {
      escapedText = text.replace(isSpoiler, function(match) {
        return (
          `<details><summary>Spoiler</summary>` +
          match.slice(2, -2) +
          `</details>`
        );
      });
    }

    if (escapedText.match(isCenter)) {
      escapedText = escapedText.replace(isCenter, function(match) {
        return `<span><center>` + match.slice(2, -2) + `</center></span>`;
      });
    }

    return `
           <h${level}>   
             ${escapedText}
           </h${level}>`;
  };

  // Override function

  renderer.paragraph = function(text) {
    let escapedText = text;
    const isSpoiler = /(!{2}(.*)!{2})/g;
    const isCenter = /(§{2}(.*)§{2})/g;
    const isYoutube = /(youtube\({1}(.*)\){1})/g;
    // const isHorizontal = /(_{2}(.*)_{2})/g;
    // const isBlockQuote = /(\>{2}(.*)\>{2})/g;

    if (text.match(isSpoiler)) {
      escapedText = text.replace(isSpoiler, function(match) {
        return (
          `<details><summary>Spoiler</summary>` +
          match.slice(2, -2) +
          `</details>`
        );
      });
    }
    if (escapedText.match(isCenter)) {
      escapedText = escapedText.replace(isCenter, function(match) {
        return `<span><center>` + match.slice(2, -2) + `</center></span> `;
      });
    }

    if (escapedText.match(isYoutube)) {
      escapedText = escapedText.replace(isYoutube, function(match) {
        const id = match.slice(8, -1);
        const style = `style="background-image: url('https://i.ytimg.com/vi/${id}/hqdefault.jpg'); background-position: center center; background-repeat: no-repeat; background-size: cover;" `;
        if (!id.match(/^([A-Za-z0-9_-]{11})$/g)) {
          return escapedText;
        } else return `<span class="youtube" id=${id} ${style}><span class="play"></span></span>`;
      });
    }

    return escapedText;
  };

  const getMarkdown = () => {
    const rawMarkup = marked(getMarkdownText(source), {
      renderer: renderer,
      gfm: true,
      breaks: true,
    });

    return { __html: rawMarkup };
  };

  return (
    <div
      className={styles.markdown__profile}
      style={{
        background: "white",
        overflowWrap: "break-word",
        wordBreak: "break-word",
        padding: isPreview ? "20px" : "",
        fontFamily: "Spectral sans serif",
        fontSize: "17px",
      }}
    >
      <div onClick={clickHandler} dangerouslySetInnerHTML={getMarkdown()} />
    </div>
  );
};

export default memo(RenderSanitize);
