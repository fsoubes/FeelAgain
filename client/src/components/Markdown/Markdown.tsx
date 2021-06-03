// React
import React, { useCallback } from "react";
import dynamic from "next/dynamic";

// Markdown
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import "easymde/dist/easymde.min.css";

// Helpers
import { markdownHelpers } from "../../utils/mardkdownHelpers";

interface MarkdownProps {
  data?: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Markdown: React.FC<MarkdownProps> = ({ data = null, setValue }) => {
  const handleChange = (value: string) => {
    setValue(`${value} `);
  };

  const addToolBar = useCallback((instance: any) => {
    instance.gui.toolbar.remove();

    instance.toolbar.splice(10, 0, {
      name: "horizontal-line",
      action: () =>
        markdownHelpers.youtubeLink(instance.codemirror)(handleChange),
      className: "fa fa-youtube",
      noDisable: true,
      default: true,
      title: "Youtube Link (Ctrl-Y)",
    });

    instance.toolbar.splice(10, 0, {
      hotkey: "Ctrl-S",
      name: "Series",
      action: () =>
        markdownHelpers.showSeries(instance.codemirror)(handleChange),
      className: "fa fa-search",
      noDisable: true,
      default: true,
      title: "mangaCosm Series",
    });

    instance.toolbar.splice(3, 0, {
      name: "horizontal-line",
      action: () =>
        markdownHelpers.horizontaLine(instance.codemirror)(handleChange),
      className: "fa fa-window-minimize",
      noDisable: true,
      default: true,
      title: "Horizontal Line (Ctrl-S)",
    });

    instance.toolbar.splice(3, 0, {
      name: "StrikeThrough",
      action: () =>
        markdownHelpers.strikeThrough(instance.codemirror)(handleChange),
      className: "fa fa-strikethrough",
      noDisable: true,
      default: true,
      title: "StrikeThrough (Ctrl-S)",
    });

    instance.toolbar.splice(3, 0, {
      name: "Center",
      action: () =>
        markdownHelpers.centerText(instance.codemirror)(handleChange),
      className: "fa fa-align-center",
      noDisable: true,
      default: true,
      title: "Center (Ctrl-S)",
    });

    instance.toolbar.splice(3, 0, {
      hotkey: "Ctrl-S",
      name: "Spoiler",
      action: () =>
        markdownHelpers.spoilerAlert(instance.codemirror)(handleChange),
      className: "fa fa-eye-slash",
      noDisable: true,
      default: true,
      title: "Spoiler (Ctrl-S)",
    });

    instance.toolbar[17].action = "https://www.mangacosm.com/helpers/cgfm";
    instance.createToolbar();
  }, []);

  return (
    <SimpleMDE
      // extraKeys={extraKeys}
      onChange={handleChange}
      getMdeInstance={addToolBar}
      value={data ? data : undefined}
      options={{
        autofocus: true,
        spellChecker: false,
        minHeight: "60px",
      }}
    />
  );
};
export default React.memo(Markdown);
