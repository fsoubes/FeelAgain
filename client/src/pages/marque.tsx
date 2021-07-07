import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";
import Head from "../components/SEO/Head";
import styles from "../styles/Brand.module.scss";
import dynamic from "next/dynamic";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";

const CountUpDynamicComponent = dynamic({
  loader: () => import("react-countup"),
  ssr: false,
});

interface MarqueProps {}

const Marque: React.FC<MarqueProps> = ({}) => {
  const { ref, inView } = useInView({
    delay: 100,
    threshold: 0,
  });

  const router = useRouter();

  const CountUp = inView ? CountUpDynamicComponent : () => null;

  return (
    <Layout>
      <Head
        title={"Histoire de la marque feelagain"}
        description={
          "Pourquoi Feelagain est une marque unique dans la vente de chaussures?"
        }
      />
      <section className={`${styles.section__1} ${styles.brand__header}`}>
        <div className={` ${styles.sheet}`}>
          <div className={styles.header__info}>
            <h1>FeelAgain</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              maiores quaerat dicta, nostrum ducimus iusto? Repudiandae tempore
              maxime exercitationem temporibus expedita quibusdam, magni, quasi
              vitae quae laborum commodi cupiditate molestiae?
            </p>
          </div>
          <div className={`${styles.shape__1}`}></div>
        </div>
      </section>
      <section className={`${styles.section__2} `}>
        <div className={`${styles.sheet}`}>
          <div className={`${styles.shape__2}`} />
          <div className={`${styles.container}`}>
            <div className={styles.layout}>
              <div className={styles.layout__row}>
                <div className={`${styles.cell__1} `}>
                  <div className={styles.container__layout}>
                    <h3>Vision futuriste</h3>
                    <div className={styles.white__line} />
                    <p>
                      Accusantium laudantium adipisci officiis expedita illum
                      enim rem nam.
                    </p>
                  </div>
                </div>
                <div className={`${styles.cell__2} `}>
                  <div className={styles.container__layout}>
                    <h3>Conception innovante</h3>
                    <div className={styles.white__line} />
                    <p>
                      Accusantium laudantium adipisci officiis expedita illum
                      enim rem nam.
                    </p>
                  </div>
                </div>
                <div className={`${styles.cell__3} `}>
                  <div className={styles.container__layout}>
                    <h3>Produits responsables</h3>
                    <div className={styles.white__line} />
                    <p>
                      Accusantium laudantium adipisci officiis expedita illum
                      enim rem nam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.vertical__line}></div>
      </section>
      <section className={styles.section__3}>
        <div className={`${styles.sheet}`}>
          <div className={`${styles.container}`}>
            <div className={styles.content}>
              <h2>Des idées aux chaussures</h2>
              <div className={styles.info}>
                <div className={styles.horizontal__line}>
                  <div></div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit veritatis asperiores alias dicta nemo aliquid
                  sunt cum. Quidem reprehenderit, accusamus amet dignissimos
                  alias obcaecati deserunt vel voluptatem. Aliquam, itaque
                  maxime! Quisque fringilla sit amet dolor commodo efficitur.
                  Aliquam et sem odio. In ullamcorper nisi nunc, et molestie
                  ipsum iaculis sit amet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section__4}>
        <div className={styles.shape__3} />
        <div className={`${styles.sheet__whyus}`}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h2>Pourquoi nous choisir</h2>
              <ul>
                <li>
                  <div className={styles.item__content}>
                    <span className={styles.icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        id="svg-5ac6"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512.003 512.003"
                        className={styles.svg__link}
                      >
                        <g>
                          <g>
                            <path d="M381.176,33.536c-4.787-2.764-10.915-1.122-13.679,3.665c-2.764,4.797-1.122,10.915,3.665,13.679    c4.787,2.774,10.915,1.132,13.679-3.665C387.605,42.429,385.963,36.31,381.176,33.536z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M256.002,0c-5.528,0-10.014,4.486-10.014,10.014c0,5.528,4.486,10.014,10.014,10.014c5.528,0,10.014-4.486,10.014-10.014    C266.016,4.486,261.53,0,256.002,0z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M256.002,266.369c-5.528,0-10.014,4.486-10.014,10.014c0,5.528,4.486,10.014,10.014,10.014    c5.528,0,10.014-4.486,10.014-10.014C266.016,270.856,261.53,266.369,256.002,266.369z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M144.508,37.202c-2.764-4.787-8.892-6.429-13.679-3.665c-4.787,2.774-6.429,8.892-3.665,13.679    c2.764,4.797,8.892,6.439,13.679,3.665C145.629,48.117,147.272,41.998,144.508,37.202z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M256.002,40.056c-5.53,0-10.014,4.483-10.014,10.014v40.056c0,5.531,4.484,10.014,10.014,10.014    s10.014-4.483,10.014-10.014V50.069C266.016,44.539,261.532,40.056,256.002,40.056z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M184.564,106.588L164.537,71.89c-2.766-4.79-8.889-6.435-13.679-3.667c-4.79,2.765-6.432,8.888-3.667,13.679    l20.028,34.699c1.856,3.213,5.221,5.009,8.683,5.009c1.697,0,3.42-0.433,4.996-1.343    C185.687,117.502,187.329,111.378,184.564,106.588z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M361.147,68.225c-4.793-2.766-10.914-1.124-13.679,3.667l-20.028,34.698c-2.765,4.789-1.123,10.913,3.667,13.678    c1.577,0.91,3.298,1.343,4.996,1.343c3.462,0,6.827-1.797,8.683-5.009l20.028-34.698    C367.579,77.114,365.937,70.989,361.147,68.225z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M466.291,276.315c-0.001-0.123-0.008-0.245-0.014-0.369c-0.006-0.128-0.014-0.256-0.024-0.385    c-0.007-0.082-0.008-0.165-0.017-0.246c-0.012-0.112-0.032-0.224-0.047-0.335c-0.018-0.125-0.039-0.25-0.061-0.376    c-0.017-0.094-0.028-0.189-0.048-0.282c-0.02-0.093-0.047-0.185-0.069-0.278c-0.031-0.128-0.065-0.256-0.101-0.384    c-0.029-0.103-0.054-0.208-0.086-0.31c-0.023-0.072-0.053-0.143-0.078-0.215c-0.047-0.136-0.097-0.271-0.149-0.406    c-0.042-0.107-0.081-0.215-0.126-0.32c-0.024-0.055-0.053-0.109-0.078-0.164c-0.064-0.141-0.132-0.279-0.202-0.418    c-0.054-0.106-0.106-0.212-0.164-0.315c-0.01-0.018-0.017-0.036-0.027-0.054L404.995,165.31c-0.03-0.053-0.068-0.098-0.099-0.15    c-0.167-0.285-0.349-0.562-0.545-0.829c-0.051-0.07-0.1-0.141-0.152-0.21c-0.249-0.323-0.516-0.636-0.805-0.928    c-0.004-0.004-0.009-0.008-0.014-0.013c-0.274-0.276-0.571-0.533-0.879-0.778c-0.077-0.061-0.155-0.118-0.233-0.176    c-0.248-0.185-0.508-0.359-0.777-0.524c-0.087-0.053-0.172-0.109-0.261-0.159c-0.341-0.194-0.693-0.375-1.063-0.531    c-0.004-0.002-0.008-0.004-0.013-0.006c-0.001-0.001-0.003-0.001-0.004-0.002c-0.372-0.156-0.75-0.28-1.129-0.389    c-0.106-0.03-0.213-0.053-0.32-0.08c-0.298-0.075-0.597-0.135-0.897-0.182c-0.107-0.016-0.212-0.034-0.32-0.047    c-0.401-0.049-0.802-0.08-1.201-0.08c-0.001,0-0.002,0-0.004,0h-0.002c-0.017,0-0.033,0-0.05,0H256.002h-0.026H115.824    c-0.415-0.001-0.83,0.031-1.247,0.082c-0.097,0.012-0.192,0.029-0.288,0.044c-0.303,0.047-0.606,0.108-0.908,0.184    c-0.112,0.028-0.223,0.054-0.333,0.086c-0.327,0.094-0.652,0.206-0.974,0.335c-0.054,0.022-0.109,0.037-0.163,0.06    c-0.009,0.004-0.019,0.006-0.028,0.01c-0.362,0.154-0.706,0.332-1.039,0.523c-0.084,0.048-0.163,0.102-0.245,0.152    c-0.27,0.164-0.53,0.339-0.779,0.526c-0.082,0.061-0.163,0.123-0.244,0.187c-0.278,0.221-0.544,0.455-0.794,0.702    c-0.033,0.032-0.068,0.061-0.1,0.094c-0.287,0.291-0.554,0.6-0.801,0.922c-0.047,0.061-0.089,0.126-0.135,0.188    c-0.197,0.269-0.381,0.548-0.549,0.835c-0.03,0.052-0.068,0.097-0.098,0.149L47.134,271.233c-0.002,0.003-0.003,0.005-0.005,0.008    l-0.119,0.209c-0.01,0.018-0.017,0.037-0.028,0.055c-0.062,0.111-0.118,0.225-0.176,0.339c-0.072,0.141-0.142,0.282-0.207,0.427    c-0.02,0.044-0.042,0.088-0.062,0.132c-0.049,0.113-0.091,0.229-0.136,0.345c-0.054,0.138-0.106,0.276-0.154,0.417    c-0.021,0.06-0.045,0.12-0.064,0.18c-0.035,0.11-0.061,0.223-0.093,0.335c-0.037,0.132-0.074,0.264-0.105,0.399    c-0.019,0.08-0.042,0.159-0.059,0.239c-0.021,0.101-0.034,0.205-0.052,0.307c-0.023,0.13-0.046,0.26-0.064,0.393    c-0.013,0.098-0.03,0.196-0.04,0.294c-0.01,0.09-0.011,0.181-0.019,0.271c-0.011,0.133-0.021,0.265-0.026,0.399    c-0.004,0.11-0.01,0.22-0.011,0.33c0,0.023-0.003,0.046-0.003,0.069c0,0.062,0.008,0.123,0.009,0.185    c0.002,0.132,0.007,0.264,0.014,0.397c0.006,0.109,0.012,0.218,0.022,0.327c0.008,0.093,0.019,0.184,0.03,0.276    c0.015,0.126,0.033,0.251,0.053,0.377c0.016,0.099,0.031,0.198,0.05,0.296c0.019,0.102,0.039,0.203,0.062,0.304    c0.027,0.121,0.058,0.24,0.089,0.36c0.023,0.089,0.047,0.178,0.072,0.267c0.031,0.107,0.062,0.213,0.096,0.319    c0.037,0.114,0.079,0.226,0.12,0.338c0.032,0.087,0.065,0.174,0.099,0.261c0.042,0.104,0.083,0.208,0.128,0.311    c0.045,0.104,0.095,0.206,0.144,0.308c0.045,0.093,0.091,0.185,0.138,0.277c0.051,0.097,0.101,0.194,0.155,0.29    c0.051,0.091,0.104,0.18,0.158,0.27c0.06,0.1,0.123,0.199,0.187,0.297c0.059,0.091,0.12,0.18,0.182,0.269    c0.055,0.078,0.109,0.156,0.167,0.234c0.074,0.1,0.15,0.197,0.228,0.295c0.071,0.088,0.145,0.173,0.218,0.259    c0.042,0.049,0.077,0.101,0.121,0.15L249.784,508.66c0.247,0.277,0.511,0.538,0.785,0.783c0.04,0.035,0.083,0.065,0.123,0.1    c0.289,0.251,0.592,0.482,0.905,0.697c0.102,0.07,0.206,0.136,0.31,0.202c0.292,0.184,0.592,0.352,0.9,0.506    c0.085,0.042,0.166,0.089,0.252,0.129c0.389,0.179,0.788,0.332,1.198,0.461c0.098,0.031,0.198,0.053,0.297,0.08    c0.329,0.092,0.663,0.167,1.001,0.226c0.124,0.021,0.247,0.043,0.372,0.06c0.437,0.058,0.876,0.098,1.323,0.098    c0.011,0,0.021,0,0.031,0c0.448-0.001,0.889-0.043,1.327-0.103c0.125-0.017,0.247-0.039,0.372-0.061    c0.339-0.06,0.675-0.136,1.005-0.23c0.099-0.028,0.199-0.05,0.297-0.082c0.41-0.13,0.81-0.286,1.2-0.468    c0.085-0.04,0.166-0.087,0.25-0.129c0.309-0.155,0.61-0.326,0.902-0.513c0.105-0.067,0.208-0.134,0.311-0.205    c0.31-0.215,0.61-0.446,0.896-0.696c0.043-0.038,0.09-0.071,0.133-0.109c0.274-0.249,0.538-0.512,0.786-0.793L463.79,283.01    c0.036-0.041,0.065-0.085,0.1-0.126c0.066-0.077,0.132-0.155,0.196-0.234c0.086-0.107,0.168-0.215,0.249-0.325    c0.056-0.076,0.111-0.152,0.165-0.229c0.056-0.08,0.11-0.162,0.164-0.244c0.07-0.107,0.136-0.215,0.202-0.324    c0.054-0.09,0.108-0.178,0.159-0.269c0.048-0.087,0.093-0.175,0.139-0.264c0.051-0.099,0.1-0.2,0.148-0.301    c0.05-0.104,0.101-0.207,0.147-0.312c0.041-0.094,0.077-0.189,0.115-0.284c0.037-0.093,0.072-0.187,0.106-0.282    c0.042-0.115,0.086-0.23,0.124-0.346c0.031-0.096,0.057-0.193,0.086-0.29c0.028-0.096,0.052-0.193,0.077-0.29    c0.031-0.122,0.065-0.243,0.091-0.367c0.02-0.091,0.037-0.183,0.054-0.276c0.02-0.107,0.036-0.215,0.053-0.323    c0.019-0.126,0.039-0.251,0.054-0.378c0.01-0.082,0.019-0.165,0.026-0.248c0.011-0.12,0.016-0.24,0.023-0.362    c0.007-0.129,0.013-0.258,0.015-0.386c0.001-0.054,0.008-0.107,0.008-0.161C466.294,276.36,466.291,276.338,466.291,276.315z     M381.223,180.25l-32.468,77.478l-70.172-77.478H381.223z M233.58,180.25l-69.537,77.586l-33.079-77.586H233.58z M114.542,192.8    l31.367,73.569H72.9L114.542,192.8z M78.098,286.397h76.348l69.721,163.517L78.098,286.397z M257.174,476.267l-80.956-189.87    h39.729c5.53,0,10.014-4.483,10.014-10.014c0-5.531-4.484-10.014-10.014-10.014h-32.656l72.751-81.174l73.519,81.174h-33.502    c-5.53,0-10.014,4.483-10.014,10.014c0,5.531,4.484,10.014,10.014,10.014h40.683L257.174,476.267z M290.019,449.71l68.438-163.313    h75.636L290.019,449.71z M366.848,266.369l30.767-73.418l41.502,73.418H366.848z"></path>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <h6>qualité optimale</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      nullam nunc justo sagittis suscipit ultrices.
                    </p>
                  </div>
                </li>
                <li>
                  <div className={styles.item__content}>
                    <span className={styles.icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        id="svg-cc6e"
                        x="0px"
                        y="0px"
                        viewBox="0 0 480 480"
                        className={styles.svg__link}
                      >
                        <g>
                          <g>
                            <path d="M240,0c-26.51,0-48,21.49-48,48s21.49,48,48,48c26.499-0.026,47.974-21.501,48-48C288,21.49,266.51,0,240,0z M240,80    c-17.673,0-32-14.327-32-32s14.327-32,32-32c17.673,0,32,14.327,32,32S257.673,80,240,80z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M272,104h-1.888l-1.688,0.84c-17.901,8.913-38.947,8.913-56.848,0l-1.688-0.84H208c-22.08,0.026-39.974,17.92-40,40v48    c0,13.255,10.745,24,24,24h96c13.255,0,24-10.745,24-24v-48C311.974,121.92,294.08,104.026,272,104z M296,192c0,4.418-3.582,8-8,8    h-96c-4.418,0-8-3.582-8-8v-48c0.002-12.592,9.735-23.042,22.296-23.936c21.375,9.92,46.034,9.92,67.408,0    c12.56,0.894,22.294,11.344,22.296,23.936V192z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M408,264c-26.51,0-48,21.49-48,48c0,26.51,21.49,48,48,48c26.51,0,48-21.49,48-48    C455.974,285.501,434.499,264.026,408,264z M408,344c-17.673,0-32-14.327-32-32c0-17.673,14.327-32,32-32    c17.673,0,32,14.327,32,32C440,329.673,425.673,344,408,344z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M440,368h-1.888l-1.688,0.8c-17.901,8.912-38.947,8.912-56.848,0l-1.688-0.8H376c-22.08,0.026-39.974,17.92-40,40v48    c0,13.255,10.745,24,24,24h96c13.255,0,24-10.745,24-24v-48C479.974,385.92,462.08,368.026,440,368z M464,456c0,4.418-3.582,8-8,8    h-96c-4.418,0-8-3.582-8-8v-48c0.002-12.592,9.735-23.042,22.296-23.936c21.375,9.92,46.033,9.92,67.408,0    C454.265,384.958,463.998,395.408,464,408V456z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M72,264c-26.51,0-48,21.49-48,48c0,26.51,21.49,48,48,48s48-21.49,48-48C119.974,285.501,98.499,264.026,72,264z M72,344    c-17.673,0-32-14.327-32-32c0-17.673,14.327-32,32-32s32,14.327,32,32C104,329.673,89.673,344,72,344z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M104,368h-1.888l-1.688,0.8c-17.901,8.912-38.947,8.912-56.848,0l-1.688-0.8H40c-22.08,0.026-39.974,17.92-40,40v48    c0,13.255,10.745,24,24,24h96c13.255,0,24-10.745,24-24v-48C143.974,385.92,126.08,368.026,104,368z M128,456c0,4.418-3.582,8-8,8    H24c-4.418,0-8-3.582-8-8v-48c0.002-12.592,9.735-23.042,22.296-23.936c21.375,9.92,46.033,9.92,67.408,0    C118.265,384.958,127.998,395.408,128,408V456z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M319.372,406.276c-0.004-0.009-0.008-0.018-0.012-0.028c-1.732-4.065-6.431-5.956-10.495-4.224c0,0,0,0,0,0    c-36.125,15.14-76.245,17.902-114.104,7.856l7.488-2.2c4.242-1.242,6.674-5.686,5.432-9.928s-5.686-6.674-9.928-5.432l-32,9.384    c-0.12,0-0.208,0.136-0.32,0.176c-0.741,0.276-1.437,0.662-2.064,1.144c-0.278,0.15-0.545,0.318-0.8,0.504    c-0.844,0.753-1.513,1.681-1.96,2.72c-0.434,1.046-0.641,2.172-0.608,3.304c0.195,1.083,0.462,2.152,0.8,3.2    c0.048,0.112,0,0.24,0.088,0.352l16,30.616c2.046,3.919,6.881,5.438,10.8,3.392s5.438-6.881,3.392-10.8l-6.512-12.448    c43.014,12.93,89.195,10.417,130.552-7.104C319.189,415.039,321.093,410.345,319.372,406.276z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M453.656,210.344c-3.124-3.123-8.188-3.123-11.312,0l-11.32,11.32c-6.624-70.07-51.111-130.876-115.888-158.4    c-4.065-1.732-8.764,0.159-10.496,4.224c-1.732,4.065,0.159,8.764,4.224,10.496c58.11,24.697,98.504,78.669,105.816,141.384    l-9.024-9.024c-3.178-3.07-8.242-2.982-11.312,0.196c-2.994,3.1-2.994,8.015,0,11.116l24,24c3.12,3.128,8.186,3.135,11.314,0.014    c0.005-0.005,0.01-0.01,0.014-0.014l24-24C456.791,218.528,456.784,213.464,453.656,210.344z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M175.768,69.272c-0.026-0.467-0.095-0.93-0.208-1.384c0-0.072-0.088-0.12-0.12-0.2c-0.032-0.08,0-0.136,0-0.2    c-0.218-0.389-0.47-0.759-0.752-1.104c-0.259-0.469-0.565-0.911-0.912-1.32c-0.473-0.419-0.997-0.776-1.56-1.064    c-0.281-0.239-0.581-0.456-0.896-0.648l-32-14.616c-4.087-1.678-8.761,0.275-10.439,4.362c-1.587,3.865,0.068,8.301,3.799,10.182    l16.568,7.576C86.875,104.237,47.955,169.256,48,240c0,4.418,3.582,8,8,8s8-3.582,8-8c-0.04-62.293,32.901-119.952,86.584-151.552    l-5.784,12.088c-1.907,3.977-0.236,8.747,3.736,10.664c1.079,0.527,2.263,0.801,3.464,0.8c3.072-0.004,5.87-1.767,7.2-4.536    l16-33.384c0-0.08,0-0.168,0.064-0.248c0.208-0.547,0.353-1.116,0.432-1.696c0.137-0.431,0.239-0.872,0.304-1.32    C175.973,70.295,175.896,69.778,175.768,69.272z"></path>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <h6>chaussures vous correspondant</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      nullam nunc justo sagittis suscipit ultrices.
                    </p>
                  </div>
                </li>
                <li>
                  <div className={styles.item__content}>
                    <span className={styles.icon}>
                      <svg
                        version="1.1"
                        id="svg-04b4"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        className={styles.svg__link}
                      >
                        <g>
                          <g>
                            <path d="M451.72,237.26c-17.422-8.71-50.087-8.811-51.469-8.811c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5    c8.429,0.001,32.902,1.299,44.761,7.228c1.077,0.539,2.221,0.793,3.348,0.793c2.751,0,5.4-1.52,6.714-4.147    C456.927,243.618,455.425,239.113,451.72,237.26z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M489.112,344.041l-30.975-8.85c-1.337-0.382-2.271-1.62-2.271-3.011v-10.339c2.52-1.746,4.924-3.7,7.171-5.881    c10.89-10.568,16.887-24.743,16.887-39.915v-14.267l2.995-5.989c3.287-6.575,5.024-13.936,5.024-21.286v-38.65    c0-4.142-3.358-7.5-7.5-7.5H408.27c-26.244,0-47.596,21.352-47.596,47.596v0.447c0,6.112,1.445,12.233,4.178,17.699l3.841,7.682    v12.25c0,19.414,9.567,36.833,24.058,47.315l0.002,10.836c0,1.671,0,2.363-6.193,4.133l-15.114,4.318l-43.721-15.898    c0.157-2.063-0.539-4.161-2.044-5.742l-13.971-14.678v-24.64c1.477-1.217,2.933-2.467,4.344-3.789    c17.625-16.52,27.733-39.844,27.733-63.991v-19.678c5.322-11.581,8.019-23.836,8.019-36.457v-80.19c0-4.142-3.358-7.5-7.5-7.5    H232.037c-39.51,0-71.653,32.144-71.653,71.653v16.039c0,12.621,2.697,24.876,8.019,36.457v16.931    c0,28.036,12.466,53.294,32.077,69.946v25.22l-13.971,14.678c-1.505,1.581-2.201,3.679-2.044,5.742l-46.145,16.779    c-3.344,1.216-6.451,2.863-9.272,4.858l-7.246-3.623c21.57-9.389,28.403-22.594,28.731-23.25c1.056-2.111,1.056-4.597,0-6.708    c-5.407-10.814-6.062-30.635-6.588-46.561c-0.175-5.302-0.341-10.311-0.658-14.771c-2.557-35.974-29.905-63.103-63.615-63.103    s-61.059,27.128-63.615,63.103c-0.317,4.461-0.483,9.47-0.658,14.773c-0.526,15.925-1.182,35.744-6.588,46.558    c-1.056,2.111-1.056,4.597,0,6.708c0.328,0.656,7.147,13.834,28.76,23.234l-20.127,10.063C6.684,358.176,0,368.991,0,381.02    v55.409c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5V381.02c0-6.312,3.507-11.987,9.152-14.81l25.063-12.531l8.718,8.285    c6.096,5.793,13.916,8.688,21.739,8.688c7.821,0,15.645-2.897,21.739-8.688l8.717-8.284l8.172,4.086    c-3.848,6.157-6.032,13.377-6.032,20.94v57.725c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-57.725    c0-10.296,6.501-19.578,16.178-23.097l48.652-17.691l20.253,30.381c2.589,3.884,6.738,6.375,11.383,6.835    c0.518,0.051,1.033,0.076,1.547,0.076c4.098,0,8.023-1.613,10.957-4.546l12.356-12.356v78.124c0,4.142,3.358,7.5,7.5,7.5    c4.142,0,7.5-3.358,7.5-7.5v-78.124l12.356,12.356c2.933,2.934,6.858,4.547,10.957,4.547c0.513,0,1.029-0.025,1.546-0.076    c4.646-0.46,8.795-2.951,11.384-6.835l20.254-30.38l48.651,17.691c9.676,3.519,16.178,12.801,16.178,23.097v57.725    c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-57.725c0-10.428-4.143-20.208-11.093-27.441l1.853-0.529    c1.869-0.534,4.419-1.265,6.979-2.52l19.149,19.149v69.066c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-69.066    l19.016-19.016c1.011,0.514,2.073,0.948,3.191,1.267l30.976,8.85c7.07,2.02,12.009,8.567,12.009,15.921v62.044    c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-62.044C512,360.371,502.588,347.892,489.112,344.041z M48.115,330.794    c-14.029-5.048-21.066-11.778-24.07-15.453c2.048-5.354,3.376-11.486,4.275-17.959c4.136,9.917,11.063,18.383,19.795,24.423    V330.794z M91.08,351.092c-6.397,6.078-16.418,6.077-22.813-0.001l-6.975-6.628c1.177-2.205,1.824-4.705,1.824-7.324v-7.994    c5.232,1.635,10.794,2.517,16.558,2.517c5.757,0,11.316-0.886,16.557-2.512l-0.001,7.988c0,2.62,0.646,5.121,1.824,7.327    L91.08,351.092z M79.676,316.662c-22.396,0-40.615-18.22-40.615-40.615c0-4.142-3.358-7.5-7.5-7.5c-0.42,0-0.83,0.043-1.231,0.11    c0.022-0.645,0.043-1.291,0.065-1.93c0.167-5.157,0.328-10.028,0.625-14.206c0.958-13.476,6.343-25.894,15.163-34.968    c8.899-9.156,20.793-14.198,33.491-14.198s24.591,5.042,33.491,14.198c8.82,9.074,14.205,21.492,15.163,34.968    c0.296,4.177,0.458,9.047,0.628,14.203c0.015,0.443,0.03,0.892,0.045,1.338c-8.16-12.572-20.762-21.837-37.045-27.069    c-15.043-4.833-27.981-4.534-28.527-4.52c-1.964,0.055-3.828,0.877-5.191,2.291l-13.532,14.034    c-2.875,2.982-2.789,7.73,0.193,10.605s7.73,2.788,10.605-0.193l11.26-11.677c9.697,0.474,40.894,4.102,53.027,30.819    C116.738,302.04,99.816,316.662,79.676,316.662z M111.229,330.819l0.001-8.945c8.725-6.007,15.662-14.457,19.801-24.449    c0.899,6.458,2.226,12.576,4.27,17.918C132.314,318.983,125.244,325.773,111.229,330.819z M183.403,209.145v-18.608    c0-1.129-0.255-2.244-0.746-3.261c-4.826-9.994-7.273-20.598-7.273-31.518V139.72c0-31.239,25.415-56.653,56.653-56.653h104.769    v72.692c0,10.92-2.447,21.524-7.273,31.518c-0.491,1.017-0.746,2.132-0.746,3.261v21.355c0,20.311-8.165,39.15-22.991,53.047    c-1.851,1.734-3.772,3.36-5.758,4.875c-0.044,0.03-0.086,0.063-0.129,0.094c-13.889,10.545-30.901,15.67-48.667,14.519    C213.201,281.965,183.403,248.897,183.403,209.145z M225.632,360.056c-0.052,0.052-0.173,0.175-0.418,0.149    c-0.244-0.024-0.34-0.167-0.381-0.229l-23.325-34.988l7.506-7.887l35.385,24.187L225.632,360.056z M256.095,331.113    l-40.615-27.762v-14c10.509,5.681,22.276,9.234,34.791,10.044c1.977,0.128,3.942,0.191,5.901,0.191    c14.341,0,28.143-3.428,40.538-9.935v13.7L256.095,331.113z M287.357,359.978c-0.041,0.062-0.137,0.205-0.381,0.229    c-0.245,0.031-0.365-0.098-0.418-0.149l-18.767-18.767l35.385-24.188l7.507,7.887L287.357,359.978z M424.308,353.65l-17.02-17.019    c0.297-1.349,0.465-2.826,0.464-4.455l-0.001-3.165c4.723,1.55,9.701,2.47,14.852,2.624c0.578,0.018,1.151,0.026,1.727,0.026    c5.692,0,11.248-0.86,16.536-2.501v3.02c0,1.496,0.188,2.962,0.542,4.371L424.308,353.65z M452.591,305.196    c-7.949,7.714-18.45,11.788-29.537,11.446c-21.704-0.651-39.361-19.768-39.361-42.613v-14.021c0-1.165-0.271-2.313-0.792-3.354    l-4.633-9.266c-1.697-3.395-2.594-7.195-2.594-10.991v-0.447c0-17.974,14.623-32.596,32.596-32.596h64.673v31.15    c0,5.034-1.19,10.075-3.441,14.578l-3.786,7.572c-0.521,1.042-0.792,2.189-0.792,3.354v16.038    C464.924,287.126,460.544,297.478,452.591,305.196z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M472.423,380.814c-4.142,0-7.5,3.358-7.5,7.5v48.115c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-48.115    C479.923,384.173,476.565,380.814,472.423,380.814z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M39.577,390.728c-4.142,0-7.5,3.358-7.5,7.5v38.201c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-38.201    C47.077,394.087,43.719,390.728,39.577,390.728z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M317.532,158.475c-28.366-28.366-87.715-22.943-111.917-19.295c-7.623,1.149-13.155,7.6-13.155,15.339v17.278    c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-17.279c0-0.255,0.168-0.473,0.392-0.507    c9.667-1.457,28.85-3.705,48.725-2.38c23.388,1.557,40.328,7.428,50.349,17.45c2.929,2.929,7.678,2.929,10.606,0    C320.461,166.152,320.461,161.403,317.532,158.475z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M167.884,396.853c-4.142,0-7.5,3.358-7.5,7.5v32.077c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-32.077    C175.384,400.212,172.026,396.853,167.884,396.853z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M344.306,396.853c-4.142,0-7.5,3.358-7.5,7.5v32.077c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-32.077    C351.806,400.212,348.448,396.853,344.306,396.853z"></path>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <h6>équipe dévouée</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      nullam nunc justo sagittis suscipit ultrices.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.content__50}></div>
          </div>
        </div>
      </section>
      <section className={styles.section__5}>
        <div className={styles.shape__4} />
        <div className={`${styles.sheet}`}>
          <div className={styles.column}>
            <div className={styles.row}>
              <div className={styles.image__1} />
              <div className={styles.image__2} />
              <div className={styles.image__3} />
            </div>
            <div className={styles.row}>
              <div className={styles.image__4} />
              <div className={styles.image__5} />
              <div className={styles.image__6} />
            </div>
            <div className={styles.row}>
              <div className={styles.image__7} />
              <div className={styles.image__8} />
              <div className={styles.image__9} />
            </div>
            <div className={styles.row}>
              <div className={styles.image__10} />
              <div className={styles.image__11} />
              <div className={styles.image__12} />
            </div>
          </div>
        </div>
        <div className={styles.vertical__line}></div>
      </section>
      <section className={styles.section__6}>
        <div className={`${styles.sheet}`}>
          <div className={styles.container}>
            <h2>Nos résultats</h2>
            <div ref={ref} className={styles.stats}>
              <div>
                <CountUp end={227} duration={4} />
                <h5>Chaussures</h5>
              </div>
              <div>
                <CountUp end={10} duration={4} />
                <h5>Saisons</h5>
              </div>
              <div>
                <CountUp end={123} duration={4} />
                <h5>Ventes total</h5>
              </div>
              <div>
                <CountUp end={120} duration={4} />
                <h5>Clients satisfait</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section__7}>
        <div className={`${styles.sheet}`}>
          <div className={styles.container}>
            <div className={`${styles.contact__image} ${styles.content__50}`}>
              <img src="https://images03.nicepage.com/c461c07a441a5d220e8feb1a/78047082d18e557194269c5b/6b12dcda02a6430ce0c2c2a3bbc98bf3.jpg"></img>
            </div>
            <div className={`${styles.contact__info} ${styles.content__50}`}>
              <h2>Contactez Nous</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis veniam modi iure commodi saepe asperiores autem,
                iusto corrupti accusamus sed voluptatum perspiciatis cum
                nesciunt quisquam nostrum distinctio magnam a iste.
              </p>
              <Button onClick={() => router.push("/contact")} disableRipple>
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Marque);
