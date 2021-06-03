import React from "react";
import { withApollo } from "../utils/withApollo";
import { Layout } from "../components/Layout";
import styles from "../styles/LandingPage.module.scss";
import Button from "@material-ui/core/Button";
import * as Carousel from "../components/Carousel/index";
import RatingRes from "../components/StarRating/RatingRes";
import useResponsive from "../utils/useResponsive";

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
  const { isTabletorMobile } = useResponsive();
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
                    alt=""
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
                      alt=""
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
      <div className="container__shop">
        <div className={styles.container}>
          <div className={`${styles.presentation} ${styles.presentation__row}`}>
            <div
              className={`${styles.presentation__col} ${styles.presentation__left}`}
            >
              <h2>FeelAgain</h2>
              <div className={styles.presentation__line}></div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati commodi dolore amet odio possimus necessitatibus
                excepturi laudantium voluptatibus sunt nam aliquid, alias
                expedita velit omnis sequi fugiat a eligendi nemo!
              </p>
              <Button className={styles.action} disableRipple>
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
                  <img src="/shoes_landing.jpeg"></img>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.collection}>
            <h2>Shoes Collection</h2>
            <h4>Summer 2021</h4>
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
                LA référence auprès des professionnels.
              </p>
            </div>
            <Button
              className={styles.action}
              style={{ margin: "5px", padding: "10px 15px" }}
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