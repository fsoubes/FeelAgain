const isYoutube = (getURL: any) => {
  if (typeof getURL !== "string") return false;
  const newA = document.createElement("A") as any;
  newA.href = getURL;
  const host = newA.hostname;
  const srch = newA.search;
  const path = newA.pathname;
  if (host.search(/youtube\.com|youtu\.be/) === -1) return false;
  if (host.search(/youtu\.be/) !== -1) return path.slice(1);
  /*  if (path && path.search(/embed/) !== -1)
    return /embed\/([A-z0-9_-]+)(&|$)/.exec(path)[1]; */
  const getId = /v=([A-z0-9_-]+)(&|$)/.exec(srch);
  if (host.search(/youtube\.com/) !== -1) return !getId ? "" : getId[1];
};

const spoilerAlert = (cm: any) => {
  return (handleChange: any) => {
    const selectedText = cm.getSelection();
    const text = selectedText;
    const start = `!!`;
    const end = "!!";
    const startPoint = cm.getCursor("start");
    const endPoint = cm.getCursor("end");
    cm.replaceSelection(start + text + end);
    startPoint.ch += start.length;
    startPoint.ch += 0;
    endPoint.ch = startPoint.ch + text.length;
    cm.setSelection(startPoint, endPoint);
    cm.on("change", handleChange(cm.getValue()));
    cm.off("change", handleChange(cm.getValue()));
    cm.focus();
  };
};

const centerText = (cm: any) => {
  return (handleChange: any) => {
    const selectedText = cm.getSelection();
    const text = selectedText;
    const start = `§§`;
    const end = "§§\n";
    const startPoint = cm.getCursor("start");
    const endPoint = cm.getCursor("end");
    cm.replaceSelection(start + text + end);
    startPoint.ch += start.length;
    startPoint.ch += 0;
    endPoint.ch = startPoint.ch + text.length;
    cm.setSelection(startPoint, endPoint);
    cm.on("change", handleChange(cm.getValue()));
    cm.off("change", handleChange(cm.getValue()));
    cm.focus();
  };
};

const showSeries = (cm: any) => {
  return (handleChange: any) => {
    const selectedText = cm.getSelection();
    const text = selectedText;

    const start = `mangacosm(`;
    const end = `) \n`;
    const data = start + text + end;
    cm.replaceSelection(data);

    cm.on("change", handleChange(cm.getValue()));
    cm.off("change", handleChange(cm.getValue()));
    cm.focus();
  };
};

const horizontaLine = (cm: any) => {
  return (handleChange: any) => {
    const start = `\n<hr/>\n`;
    cm.replaceSelection(start);
    cm.on("change", handleChange(cm.getValue()));
    cm.off("change", handleChange(cm.getValue()));
    cm.focus();
  };
};

const strikeThrough = (cm: any) => {
  return (handleChange: any) => {
    const selectedText = cm.getSelection();
    const text = selectedText;
    const start = `~~`;
    const end = "~~";
    const startPoint = cm.getCursor("start");
    const endPoint = cm.getCursor("end");
    cm.replaceSelection(start + text + end);
    startPoint.ch += start.length;
    startPoint.ch += 0;
    endPoint.ch = startPoint.ch + text.length;
    cm.setSelection(startPoint, endPoint);
    cm.on("change", handleChange(cm.getValue()));
    cm.off("change", handleChange(cm.getValue()));
    cm.focus();
  };
};

const youtubeLink = (cm: any) => {
  return (handleChange: any) => {
    let url = prompt("Paste Url ?");
    let isValid = isYoutube(url);
    if (url && isValid) {
      const start = `youtube(`;
      const end = `) \n`;
      const data = start + isValid + end;
      cm.replaceSelection(data);

      cm.on("change", handleChange(cm.getValue()));
      cm.off("change", handleChange(cm.getValue()));
      cm.focus();
    }
  };
};

export const markdownHelpers = {
  spoilerAlert,
  centerText,
  horizontaLine,
  strikeThrough,
  youtubeLink,
  showSeries,
};
