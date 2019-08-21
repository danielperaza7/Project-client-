import styles from "./Header.css";

export function getMenuTagsStyles(tags) {
  if (tags && Array.isArray(tags)) {
    let stylesStr = "";
    tags.map((tag) => {
      let str;
      switch (tag) {
        case "red":
          str = styles["tag-red"];
          break;
        default:
          str = null;
          break;
      }
      if (str) {
        stylesStr = (stylesStr === "" ? "" : `${stylesStr} `) + str;
      }
    });
    return stylesStr;
  }
  return "";
}
