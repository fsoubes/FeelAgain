import { Link, Button } from "@material-ui/core";
import styles from "../../styles/Payment.module.scss";

interface ValidationProps {
  children?: JSX.Element;
}

const Validation: React.FC<ValidationProps> = ({ children }) => {
  return (
    <div className={styles.Result}>
      <div className={styles.ResultTitle} role="alert">
        Paiement réussi
      </div>
      <div
        className={styles.ResultMessage}
        style={{ display: "flex", flexDirection: "column" }}
      >
        Nous vous remercions de votre commande. Un e-mail sera envoyé lorsque la
        commande aura été expédié. Vous pouvez suivre l'état de votre commande
        ou l'annuler (48h) en cliquant sur le boutton ci-dessous.
        <Link href="/order">
          <Button
            style={{
              background: "black",
              color: "white",
              padding: "5px",
              marginTop: "1rem",
            }}
          >
            Voir commande
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
};
export default Validation;
