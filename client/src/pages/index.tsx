import { withApollo } from "../utils/withApollo";
import { Layout } from "../components/Layout";
import styles from "../styles/LandingPage.module.scss";
import Button from "@material-ui/core/Button";
import * as Carousel from "../components/Carousel/index";
import RatingRes from "../components/StarRating/RatingRes";
import useResponsive from "../utils/useResponsive";
import { useRouter } from "next/router";
import Head from "../components/SEO/Head";
import { useEffect } from "react";

type Review = {
  src: string;
  review: string;
  title: string;
  score: number;
  who: string;
};

const carouselReviews: Review[] = [
  {
    title: "Une chaussure faite pour nous.",
    score: 5,
    who: "Emilie Alexandria, Bordeaux",
    src:
      "https://cdn.shopify.com/s/files/1/0826/9387/products/JasminNaturel_aceb6192-8485-4209-a16f-b90799c66f8b.png?v=1614176209",
    review:
      "“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel aliquam dolorum quam iste, est dicta cum hic harum veritatis adipisci a ipsum ipsam voluptatem corrupti iusto explicabo molestiae illum labore.”",
  },
  {
    title: "Une chaussure passe partout.",
    who: "Joseline Sandro, Anger",
    score: 4,
    src:
      "https://cdn.shopify.com/s/files/1/0826/9387/products/LilyNoir.png?v=1614174044",
    review:
      "“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel aliquam dolorum quam iste, est dicta cum hic harum veritatis adipisci a ipsum ipsam voluptatem corrupti iusto explicabo molestiae illum labore.”",
  },
  {
    title: "Classique!",
    who: "Sarah Venon, Paris",
    score: 4,
    src:
      "https://cdn.shopify.com/s/files/1/0826/9387/products/MargotCiel_dd31ea56-68ac-4e66-9545-ae1503e4bf4e.png?v=1614248524",
    review:
      "“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel aliquam dolorum quam iste, est dicta cum hic harum veritatis adipisci a ipsum ipsam voluptatem corrupti iusto explicabo molestiae illum labore.”",
  },
  {
    title: "Se sentir Cendrillon !",
    who: "Victoria London, Paris",
    score: 5,
    src:
      "https://cdn.shopify.com/s/files/1/0826/9387/products/AmaroCorail_a65c715f-2705-4a93-9722-41cee2fba4ba.png?v=1614177675",
    review:
      "“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel aliquam dolorum quam iste, est dicta cum hic harum veritatis adipisci a ipsum ipsam voluptatem corrupti iusto explicabo molestiae illum labore.”",
  },
];

const Home: React.FC = ({}) => {
  const router = useRouter();
  const { isTabletorMobile } = useResponsive();

  useEffect(() => {
    if (router.asPath === "/#_=_") {
      router.replace("/");
    }
  }, []);

  const carousel = Array(isTabletorMobile ? 4 : 2)
    .fill(null)
    .map((__, index) => {
      return (
        <Carousel.Slide key={index}>
          <div className={styles.reviews__container}>
            <div className={styles.reviews__content}>
              <div className={styles.reviews__main}>
                <div className={styles.reviews__img}>
                  <img
                    src={
                      carouselReviews[
                        isTabletorMobile ? index : index + 1 * index
                      ].src
                    }
                    alt={
                      carouselReviews[
                        isTabletorMobile ? index : index + 1 * index
                      ].title
                    }
                  ></img>
                </div>
                <div className={styles.reviews__info}>
                  <h4>
                    {
                      carouselReviews[
                        isTabletorMobile ? index : index + 1 * index
                      ].title
                    }
                  </h4>
                  <RatingRes
                    isLanding={true}
                    rating={
                      carouselReviews[
                        isTabletorMobile ? index : index + 1 * index
                      ].score
                    }
                  />
                  <p>
                    {
                      carouselReviews[
                        isTabletorMobile ? index : index + 1 * index
                      ].review
                    }
                  </p>
                  <h5>
                    {
                      carouselReviews[
                        isTabletorMobile ? index : index + 1 * index
                      ].who
                    }
                  </h5>
                </div>
              </div>
              <div style={{ padding: "10px" }}>
                <Button className={styles.small__action}>PARCOURIR</Button>
              </div>
            </div>
            {!isTabletorMobile && (
              <div className={styles.reviews__content}>
                <div className={styles.reviews__main}>
                  <div className={styles.reviews__img}>
                    <img
                      src={carouselReviews[index + 1 * (index + 1)].src}
                      alt={carouselReviews[index + 1 * (index + 1)].title}
                    ></img>
                  </div>
                  <div className={styles.reviews__info}>
                    <h4>{carouselReviews[index + 1 * (index + 1)].title}</h4>
                    <RatingRes
                      isLanding={true}
                      rating={carouselReviews[index + 1 * (index + 1)].score}
                    />
                    <p>{carouselReviews[index + 1 * (index + 1)].review}</p>
                    <h5>{carouselReviews[index + 1 * (index + 1)].who}</h5>
                  </div>
                </div>
                <div style={{ padding: "10px" }}>
                  <Button className={styles.small__action}>PARCOURIR</Button>
                </div>
              </div>
            )}
          </div>
        </Carousel.Slide>
      );
    });

  return (
    <Layout>
      <Head
        title={"Découvrez  les 4 saisons avec FeelAgain."}
        description={
          "Découvrez  les 4 saisons avec FeelAgain .Avec nos produits en éditions limitées. Laissez-vous tenter et découvrez nos chaussures."
        }
      />
      <div className="container__shop">
        <div className={styles.container}>
          <div className={`${styles.presentation} ${styles.presentation__row}`}>
            <div
              className={`${styles.presentation__col} ${styles.presentation__left}`}
            >
              <h2>FeelAgain</h2>
              <div className={styles.presentation__line}></div>
              <p>
                <strong>Découvrez&nbsp;</strong> les 4 saisons avec
                <strong>&nbsp;FeelAgain</strong>.<br></br>
                Avec nos <strong>produits</strong> en éditions limitées.
              </p>
              <p>
                Laissez-vous tenter et découvrez nos <strong>chaussures</strong>
                .
              </p>
              <Button
                className={styles.action}
                disableRipple
                onClick={() => router.push("/shop")}
              >
                LA BOUTIQUE
              </Button>
            </div>
            <div className={styles.presentation__col}>
              <div className={styles.presentation_20}>
                <div className={styles.presentation__row}>
                  <div className={styles.presentation_24}></div>
                  <div className={styles.presentation_36}></div>
                </div>
              </div>
              <div className={styles.presentation_40}>
                <div>
                  <img src="/shoes_landing.jpeg" alt="top"></img>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.collection}>
            <h2>Nouvelle Collection</h2>
            <h4>Été 2021</h4>
            <div className={styles.collection__grid}>
              <div className={styles.item__1}>
                <div className={styles.slide}>
                  <div className={styles.shading}></div>
                </div>
              </div>
              <div className={styles.item__2}>
                <div className={styles.slide}>
                  <div className={styles.shading}></div>
                </div>
              </div>
              <div className={styles.item__3}>
                <div className={styles.slide}>
                  <div className={styles.shading}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.reviews}>
            <h2>Le choix des clients</h2>
            <div className={styles.presentation__line}></div>
            <Carousel.Component
              isTabletorMobile={isTabletorMobile}
              options={{
                perView: 1,
                focusAt: "center",
                type: "carousel",
                swipeThreshold: isTabletorMobile,
                dragThreshold: isTabletorMobile,
              }}
            >
              {carousel}
            </Carousel.Component>
          </div>
          <div className={styles.brand}>
            <h2>La marque</h2>
            <div>
              <p>
                La marque propose une gamme de chaussures. Ils vous garantissent
                protection, résistance et confort. Cette nouvelle marque devient
                <strong>&nbsp;LA</strong> référence auprès des professionnels.
              </p>
            </div>
            <Button
              className={styles.action}
              style={{ marginBottom: "1rem" }}
              onClick={() => router.push("/marque")}
            >
              Lire La Suite
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Home);
