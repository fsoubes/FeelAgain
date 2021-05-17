import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import styles from "../../styles/Sort.module.scss";

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
      {item}
    </li>
  ));

  return (
    <div className={styles.container}>
      <ul className={styles.list}>{listOptions}</ul>
    </div>
  );
};
export default SubMenu;
