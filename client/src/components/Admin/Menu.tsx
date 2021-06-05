import Link from "next/link";
import { memo } from "react";
import { sideBarMenu } from "../../constants/constants";
import styles from "../../styles/DashboardMenu.module.scss";

interface MenuProps {
  title: string;
}

const Menu: React.FC<MenuProps> = ({ title }) => {
  return (
    <div className={styles.sidebar__container}>
      <h2 className={styles.sidebar__title}>{title}</h2>
      <ul className={styles.sidebar__menu}>
        {sideBarMenu.map((item, index) => {
          return item.sub.length === 0 ? (
            <Link href={item.path} key={index}>
              <li className={styles.sidebar__item}>
                <span>{item.title}</span>
              </li>
            </Link>
          ) : (
            <li key={index} className={styles.sidebar__topitem}>
              <span>{item.title}</span>
              <ul>
                {item.sub.map((subtitle, index) => {
                  return (
                    <Link href={subtitle.path} key={index}>
                      <li className={styles.sidebar__subitem}>
                        <span>{subtitle.title}</span>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default memo(Menu);
