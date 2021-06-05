import { useRouter } from "next/router";
import styles from "../../styles/SubMenu.module.scss";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GradeIcon from "@material-ui/icons/Grade";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

interface submenu {
  commandes: string;
  panier: string;
  evaluer: string;
  deconnexion: string;
}

interface SubMenuProps {
  options: submenu;
  logout: () => Promise<void>;
}

const icons = [
  <LocalShippingIcon style={{ marginRight: "1rem" }} />,
  <ShoppingBasketIcon style={{ marginRight: "1rem" }} />,
  <GradeIcon style={{ marginRight: "1rem" }} />,
  <ExitToAppIcon style={{ marginRight: "1rem" }} />,
];

const SubMenu: React.FC<SubMenuProps> = ({ options, logout }) => {
  const router = useRouter();
  const handleClick = (item: keyof submenu) => {
    if (item === "deconnexion") {
      logout();
    } else {
      router.push(options[item]);
    }
  };

  const listOptions = Object.keys(options).map((item, index) => (
    <li
      className={styles.item}
      key={index}
      onClick={() => handleClick(item as keyof submenu)}
    >
      {icons[index]}
      <div>{item}</div>
    </li>
  ));

  return (
    <div className={styles.container}>
      <ul className={styles.list}>{listOptions}</ul>
    </div>
  );
};
export default SubMenu;
