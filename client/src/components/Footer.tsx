import React, { useContext, useRef, useState } from "react";
import { Button } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import { ToggleThemeContext } from "../theme";
import SunIcon from "@material-ui/icons/WbSunnyOutlined";
import MoonIcon from "@material-ui/icons/Brightness2Outlined";
import styles from "../styles/Footer.module.scss";
import Logo from "../svg/feelagain";
import Link from "next/link";
import Image from "next/image";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import { useAddToNewsletterMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const [newsletter] = useAddToNewsletterMutation();
  const newsletterRef = useRef<HTMLInputElement>(null);
  const [isSubmit, setSubmit] = useState(false);
  const handleClick = async (e: any) => {
    try {
      e.preventDefault();
      await newsletter({
        variables: { email: newsletterRef?.current?.value as string },
      });
      e.target.reset();
      setSubmit(true);
      setTimeout(() => setSubmit(false), 5000);
    } catch (err) {
      throw err;
    }
  };

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
              <span>
                LIVRAISON À <strong>DOMICILE</strong>
              </span>
              <span>
                OU <strong>POINT RELAIS</strong>
              </span>
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
              <span>
                <strong>SÉCURISÉ</strong>
              </span>
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
              <span>
                <strong>GRATUIT</strong>
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.feelagain__accept}>
        <div className={styles.feelagain__accept_images}>
          <span>Moyens de paiement acceptés</span>
          <img src="/accepted.png" width="256" height="28" alt="picture" />
        </div>
        <div className={styles.feelagain__accept_images}>
          <span>Nos transporteurs</span>
          <img src="/carrier.png" width="256" height="28" alt="picture" />
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
          <div className={styles.social}>
            <a href="https://www.facebook.com/" target="_blank">
              <FacebookIcon />
            </a>
            <a href="https://twitter.com/">
              <TwitterIcon />
            </a>
            <a href="https://www.instagram.com/">
              <InstagramIcon />
            </a>
          </div>
        </div>
        <div className={styles.columns}>
          <div className={styles.column__contact}>
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
          <div className={styles.column__collection}>
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

          <div className={styles.column__newsletter}>
            <h2>NEWSLETTER</h2>
            <form onSubmit={handleClick}>
              <input
                type="email"
                ref={newsletterRef}
                placeholder="Your email address"
              />
              <input type="submit" value="Subscribe" />
            </form>
            <span>Rester informé de notre actualité</span>
            <br />
            {isSubmit && (
              <span style={{ color: "green", fontWeight: "bold" }}>
                Nous avons bien reçu votre email.
                <br />
                Vous serez notifié par email de nos nouveautées.
              </span>
            )}
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
          <Tooltip title="Modifier le thème">
            <Button
              variant="text"
              color="inherit"
              onClick={toggleTheme}
              disableRipple
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </Button>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(withApollo({ ssr: false })(Footer));
