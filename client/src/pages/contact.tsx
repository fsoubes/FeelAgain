import React from "react";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";
import styles from "../styles/Contact.module.scss";
import { Button } from "@material-ui/core";

interface ContactProps {}

const Contact: React.FC<ContactProps> = ({}) => {
  return (
    <Layout>
      <section className={styles.section__4}>
        <div className={styles.shape__3} />
        <div className={`${styles.sheet__whyus}`}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h2>Nous contacter</h2>
              <form>
                <input placeholder={"Votre nom ..."}></input>
                <input placeholder={"Votre mail ..."}></input>
                <textarea rows={6} placeholder={"Votre message ..."}></textarea>
                <Button disableRipple>VALIDER</Button>
              </form>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
                magni dolorum reprehenderit pariatur et maiores a aperiam
                officiis tempora saepe minus ?
              </p>
            </div>
            <div className={styles.content__50} />
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Contact);
