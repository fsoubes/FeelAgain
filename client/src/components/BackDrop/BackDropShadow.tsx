import styles from "../../styles/BackDrop.module.scss";

interface BackDropShadowProps {}

const BackDropShadow: React.FC<BackDropShadowProps> = ({}) => {
  return <div className={styles.backdrop}></div>;
};
export default BackDropShadow;
