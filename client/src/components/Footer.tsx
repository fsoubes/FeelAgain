import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import { ToggleThemeContext } from "../theme";
import SunIcon from "@material-ui/icons/WbSunnyOutlined";
import MoonIcon from "@material-ui/icons/Brightness2Outlined";
import styles from "../styles/Footer.module.scss";
import Logo from "../svg/feelagain";
import Link from "next/link";
import Image from "next/image";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { toggleTheme, isDark } = useContext(ToggleThemeContext);
  return (
    <footer>
      <div className={styles.feelagain__methods}>
        <ul>
          <li>
            <a>
              <Image
                src="/delivery.svg"
                quality="100"
                width="48"
                height="48"
                alt="picture"
              />
              <span>LIVRAISON À DOMICILE</span>
              <span>OU POINT RELAIS</span>
            </a>
          </li>
          <li>
            <a>
              <Image
                src="/cardsafe.svg"
                quality="100"
                width="48"
                height="48"
                alt="picture"
              />
              <span>PAIEMENT</span>
              <span>SÉCURISÉ</span>
            </a>
          </li>
          <li>
            <a>
              <Image
                src="/return.svg"
                width="48"
                height="48"
                alt="picture"
                quality="100"
              />
              <span>RETOUR & ÉCHANGE</span>
              <span>GRATUIT</span>
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.feelagain__accept}>
        <div>
          <span>Moyens de paiement acceptés</span>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div>
          <span>Nos transporteurs</span>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div
          className={styles.logo}
          style={{
            height: "100%",
            width: "30px",
            display: "flex",
            alignItems: "center",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <Link href="/">
            <div>
              <Logo />
            </div>
          </Link>
        </div>
        <div className={styles.columns}>
          <div>
            <h2>CONTACT</h2>
            <ul>
              <li>55 rue feelagain</li>
              <li>Créteil 94000 </li>
              <li>feelagain@gmail.com</li>
            </ul>
          </div>
          <div className={styles.column__events}>
            <h2>SERVICES</h2>
            <ul>
              <Link href="/giftcard">
                <li>Carte cadeau</li>
              </Link>
              <Link href="/cgv">
                <li>CGV</li>
              </Link>
              <Link href="/faq">
                <li>FAQ</li>
              </Link>
              <Link href="/deliveryreturn">
                <li>Livraisons et retours</li>
              </Link>
            </ul>
          </div>
          <div>
            <h2>COLLECTIONS</h2>
            <ul className={styles.column__events}>
              <Link href="/shop/?type=ballerines">
                <li>Ballerines</li>
              </Link>
              <Link href="/shop/?type=boots">
                <li>Boots</li>
              </Link>
              <Link href="/shop/?type=bottes">
                <li>Bottes</li>
              </Link>
              <Link href="/shop/?type=derbies">
                <li>Debies</li>
              </Link>
              <Link href="/shop/?type=escarpins">
                <li>Escarpins</li>
              </Link>
              <Link href="/shop/?type=mules">
                <li>Mules</li>
              </Link>
              <Link href="/shop/?type=mocassins">
                <li>Mocassins</li>
              </Link>
              <Link href="/shop/?type=sandales">
                <li>Sandales</li>
              </Link>
            </ul>
          </div>

          <div>
            <h2>NEWSLETTER</h2>
            <div className={styles.newsletter}>
              <input></input>
              <button>Ok</button>
            </div>
            <span>Rester informer des actualités</span>
          </div>
        </div>

        <div className={styles.copyright}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            @FeelAgain - 2021
          </a>
          <Tooltip title="Toggle Theme">
            <Button variant="text" color="inherit" onClick={toggleTheme}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </Button>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
