import React from "react";
import { withApollo } from "../src/utils/withApollo";
import { Layout } from "../src/components/Layout";
import styles from "../src/styles/LandingPage.module.scss";
import Button from "@material-ui/core/Button";
// import Carousel from "../src/components/Carousel/Carousel";
import * as Carousel from "../src/components/Carousel/index";

type Review = {
  src: string;
  review: string;
};

const carouselReviews: Review[] = [
  {
    src:
      "https://cdn.shopify.com/s/files/1/0826/9387/products/JasminNaturel_aceb6192-8485-4209-a16f-b90799c66f8b.png?v=1614176209",
    review:
      "“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel aliquam dolorum quam iste, est dicta cum hic harum veritatis adipisci a ipsum ipsam voluptatem corrupti iusto explicabo molestiae illum labore.”",
  },
  {
    src:
      "https://cdn.shopify.com/s/files/1/0826/9387/products/LilyNoir.png?v=1614174044",
    review:
      "“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel aliquam dolorum quam iste, est dicta cum hic harum veritatis adipisci a ipsum ipsam voluptatem corrupti iusto explicabo molestiae illum labore.”",
  },
  {
    src:
      "https://cdn.shopify.com/s/files/1/0826/9387/products/MargotCiel_dd31ea56-68ac-4e66-9545-ae1503e4bf4e.png?v=1614248524",
    review:
      "“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel aliquam dolorum quam iste, est dicta cum hic harum veritatis adipisci a ipsum ipsam voluptatem corrupti iusto explicabo molestiae illum labore.”",
  },
  {
    src:
      "https://cdn.shopify.com/s/files/1/0826/9387/products/AmaroCorail_a65c715f-2705-4a93-9722-41cee2fba4ba.png?v=1614177675",
    review:
      "“SLorem ipsum dolor sit amet, consectetur adipisicing elit. Vel aliquam dolorum quam iste, est dicta cum hic harum veritatis adipisci a ipsum ipsam voluptatem corrupti iusto explicabo molestiae illum labore.”",
  },
];

const test = ["", ""];

const Home: React.FC = ({}) => {
  const carousel = test.map((item, index) => {
    return (
      <Carousel.Slide key={index}>
        <div className={styles.reviews__container}>
          <div className={styles.reviews__content}>
            <div className={styles.reviews__main}>
              <div className={styles.reviews__img}>
                <img src={carouselReviews[index + 1 * index].src} alt=""></img>
              </div>
              <div className={styles.reviews__info}>
                <h4>Hello</h4>
                <p>{carouselReviews[index + 1 * index].review}</p>
              </div>
            </div>
            <div>
              <Button className={styles.small__action}>PARCOURIR</Button>
            </div>
          </div>
          <div className={styles.reviews__content}>
            <div className={styles.reviews__main}>
              <div className={styles.reviews__img}>
                <img
                  src={carouselReviews[index + 1 * (index + 1)].src}
                  alt=""
                ></img>
              </div>
              <div className={styles.reviews__info}>
                <h4>Hello</h4>
                <p>{carouselReviews[index + 1 * (index + 1)].review}</p>
              </div>
            </div>
            <div>
              <Button className={styles.small__action}>PARCOURIR</Button>
            </div>
          </div>
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
                SHOP
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
                  <div>
                    <img src="/shoes_landing.jpeg"></img>
                  </div>
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
              options={{
                perView: 1,
                focusAt: "center",
                type: "carousel",
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
