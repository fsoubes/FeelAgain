import { useRef } from "react";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";
import styles from "../styles/Contact.module.scss";
import { Button } from "@material-ui/core";
import { useSendContactMutation } from "../generated/graphql";
import Head from "../components/SEO/Head";

interface ContactProps {}

const Contact: React.FC<ContactProps> = ({}) => {
  const [sendMail] = useSendContactMutation();

  const mailRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const commentRef = useRef<HTMLTextAreaElement>();

  return (
    <Layout>
      <Head
        title={"Formulaire de contact"}
        description={`Contactez-nous pour plus d'informations`}
      />
      <section className={styles.section__4}>
        <div className={styles.shape__3} />
        <div className={`${styles.sheet__whyus}`}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h2>Nous contacter</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  if (
                    !nameRef?.current?.value ||
                    !mailRef?.current?.value ||
                    !commentRef?.current?.value
                  ) {
                    return;
                  }
                  await sendMail({
                    variables: {
                      name: nameRef?.current?.value as string,
                      email: mailRef?.current?.value as string,
                      content: commentRef?.current?.value as string,
                    },
                  });
                  (commentRef.current as HTMLTextAreaElement).value = "";
                  (mailRef.current as HTMLInputElement).value = "";
                  (nameRef.current as HTMLInputElement).value = "";
                }}
              >
                <label htmlFor="name" style={{ display: "none" }}>
                  Email
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder={"Votre nom ..."}
                  ref={nameRef as React.LegacyRef<HTMLInputElement>}
                ></input>
                <label htmlFor="mail" style={{ display: "none" }}>
                  Nom
                </label>
                <input
                  id="mail"
                  name="mail"
                  type="email"
                  ref={mailRef as React.LegacyRef<HTMLInputElement>}
                  required
                  placeholder={"Votre mail ..."}
                ></input>
                <label htmlFor="comment" style={{ display: "none" }}>
                  Commentaire
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  ref={commentRef as React.LegacyRef<HTMLTextAreaElement>}
                  rows={6}
                  placeholder={"Votre message ..."}
                  required
                  maxLength={60000}
                ></textarea>
                <Button name="submit" type="submit" disableRipple>
                  VALIDER
                </Button>
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
