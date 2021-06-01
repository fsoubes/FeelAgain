import { ImagesModel } from "./../entities/Images";
import { VariantsModel } from "./../entities/Variants";
// import { OrdersModel } from "./../entities/Orders";
import { User, UserModel } from "../entities/User";
import { Blog, BlogModel } from "../entities/Blog";
import { BasketModel } from "../entities/Basket";
import { NewsletterModel } from "../entities/Newsletter";
import { ShoesModel } from "./../entities/Shoes";
import { loremIpsum } from "lorem-ipsum";

const photos = [
  "/blog/photo-1556638608-8c4f8d1023ea.jpg",
  "/blog/photo-1451755032734-ada8d61ecf2f.jpg",
  "/blog/photo-1458560871784-56d23406c091.jpg",
  "/blog/photo-1501183007986-d0d080b147f9.jpg",
  "/blog/photo-1501612780327-45045538702b.jpg",
  "/blog/photo-1518112390430-f4ab02e9c2c8.jpg",
  "/blog/photo-1519638399535-1b036603ac77.jpg",
  "/blog/photo-1524779709304-40b5a3560c60.jpg",
  "/blog/photo-1526336024174-e58f5cdd8e13.jpg",
  "/blog/photo-1527603815363-e79385e0747e.jpg",
  "/blog/photo-1568639869881-a60b8da490b2.jpg",
  "/blog/photo-1569591159212-b02ea8a9f239.jpg",
  "/blog/photo-1581833971358-2c8b550f87b3.jpg",
  "/blog/photo-1582148405586-fb5af4396bda.jpg",
  "/blog/photo-1585664811087-47f65abbad64.jpg",
  "/blog/photo-1588351829783-6edb9bd6af6a.jpg",
  "/blog/photo-1589131489228-8cf7c794dcd3.jpg",
  "/blog/photo-1601231249063-4590d27e9eba.jpg",
  "/blog/photo-1603217192634-61068e4d4bf9.jpg",
  "/blog/photo-1622121568068-03295de7438a.jpg",
  "/blog/photo-1622182295588-ae59b9427560.jpg",
];

export async function seedDataBase() {
  const newsletter = new NewsletterModel({
    type: "newsletter",
    email: [],
    user: [],
  });

  const defaultBasket = new BasketModel({});
  const secondBasket = new BasketModel({});
  const thirdBasket = new BasketModel({});
  const fourthBasket = new BasketModel({});

  const defaultUser = new UserModel({
    email: "bob@bob.fr",
    nickname: "bob",
    password:
      "$argon2i$v=19$m=4096,t=3,p=1$SKcpzKdXCrqY4RvImpFKBA$MCO99B5R/yVdICwkRph9lfBAqxeoMxEwppB65aTVSEs",
    basket: defaultBasket._id,
  } as User);

  defaultBasket.user = defaultUser._id;

  const secondUser = new UserModel({
    email: "bob2@bob.fr",
    nickname: "bob2",
    password:
      "$argon2i$v=19$m=4096,t=3,p=1$SKcpzKdXCrqY4RvImpFKBA$MCO99B5R/yVdICwkRph9lfBAqxeoMxEwppB65aTVSEs",
    basket: secondBasket._id,
  } as User);

  secondBasket.user = secondUser._id;

  const thirdUser = new UserModel({
    email: "bob3@bob.fr",
    nickname: "bob3",
    password:
      "$argon2i$v=19$m=4096,t=3,p=1$SKcpzKdXCrqY4RvImpFKBA$MCO99B5R/yVdICwkRph9lfBAqxeoMxEwppB65aTVSEs",
    basket: thirdBasket._id,
  } as User);

  thirdBasket.user = thirdUser._id;

  const fourthUser = new UserModel({
    email: "bob4@bob.fr",
    nickname: "bob4",
    isAdmin: true,
    password:
      "$argon2i$v=19$m=4096,t=3,p=1$SKcpzKdXCrqY4RvImpFKBA$MCO99B5R/yVdICwkRph9lfBAqxeoMxEwppB65aTVSEs",
    basket: fourthBasket._id,
  } as User);

  fourthBasket.user = fourthUser._id;

  const name = ["Hokuto Naturel", "Hokuto Cuisine", "Hokuto Salleamanger"];

  const variantsSize = new Array(6).fill(null).map((__, index) => 35 + index);
  const images = [
    "https://cdn.shopify.com/s/files/1/0826/9387/products/JasminNaturel_aceb6192-8485-4209-a16f-b90799c66f8b.png?v=1614176209",
    "https://cdn.shopify.com/s/files/1/0826/9387/products/JASMINRAPHIANATUREL_c5b50c33-659d-4a49-8ccb-db44aabe9c36.jpg?v=1614249098",
    "https://cdn.shopify.com/s/files/1/0826/9387/products/jasmin-raphianaturel-2.jpg?v=1614249098",
    "https://cdn.shopify.com/s/files/1/0826/9387/products/JasminNaturel.png?v=1614249098",
  ];

  let counterImg = 1;
  const shoesIds = [];
  const variantIds = [];
  for (const title of name) {
    const shoes = new ShoesModel({
      title: title,
      vendor: "Anaki",
      product_type: "sandales",
      body_html: "Chaussures au top",
      price: 500,
      size: [35, 36, 37, 38, 39, 40],
      tags: ["pas de talon", "Noir", "Cuir"],
      handle: `${title}-noir-cuir-sandales`,
      is_published: false,
    });

    for (const variant of variantsSize) {
      const currentVar = new VariantsModel({
        title: variant.toString(),
        quantity: 25,
        price: 500,
        shoes: shoes._id,
        available: true,
      });

      shoes.variants.push(currentVar._id);
      variantIds.push(currentVar._id);
      await currentVar.save();
    }

    for (const img of images) {
      const currentImg = new ImagesModel({
        position: counterImg,
        src: img,
        product_id: shoes._id,
        width: 1500,
        height: 1500,
      });
      counterImg++;
      shoes.images.push(currentImg._id);
      await currentImg.save();
    }
    shoesIds.push(shoes._id);
    await shoes.save();
  }

  // const order_1 = new OrdersModel({});
  // const order_2 = new OrdersModel({});
  // const order_3 = new OrdersModel({});
  // const order_4 = new OrdersModel({});

  await Promise.all([
    defaultUser.save(),
    defaultBasket.save(),
    secondUser.save(),
    secondBasket.save(),
    thirdUser.save(),
    thirdBasket.save(),
    fourthUser.save(),
    fourthBasket.save(),
    newsletter.save(),
    /*    order_1.save(),
    order_2.save(),
    order_3.save(),
    order_4.save(), */
  ]);

  await BlogModel.create(([
    {
      pouet: "DYSPEPSIA HEADACHE",
      title: "Restrict L Ext Iliac Vein w Intralum Dev, Perc",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/138x214.png/ff4444/ffffff",
      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Lipidoses",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Treatment Set TS350394",
      title: "Drainage of Left Lacrimal Bone, Perc Endo Approach, Diagn",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/188x190.png/cc0000/ffffff",
      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Peripheral T cell lymphoma, spleen",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Healing",
      title: "Insert of Intralum Dev into R Innom Vein, Perc Endo Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/189x221.bmp/dddddd/000000",
      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Mixed hearing loss, unilateral",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Trout",
      title: "Supplement R Verteb Vein with Nonaut Sub, Open Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/180x149.bmp/5fa2dd/ffffff",
      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Abscess of salivary gland",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Naltrexone Hydrochloride",
      title: "Change Packing Material on Left Hand",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/127x172.png/ff4444/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Need for prophylactic vaccination and inoculation against tuberculosis [BCG]",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Bisoprolol Fumarate",
      title: "Bypass Gastric Vein to Low Vein w Synth Sub, Open",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/186x136.jpg/ff4444/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Open fracture of surgical neck of humerus",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "CataractClear",
      title: "Insertion of Ext Fix into L Humeral Head, Open Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/113x143.jpg/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Other degenerative disorders of globe",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Health Mart Pharmacy Hydrocortisone",
      title: "Supplement Right Axilla with Synth Sub, Open Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/240x111.bmp/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Pulp degeneration",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Alcohol Prep Pads",
      title: "Drainage of Jejunum, Open Approach, Diagnostic",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/181x110.png/ff4444/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Benign neoplasm of lymph nodes",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "equate daytime nitetime",
      title: "Dilate of R Ant Tib Art with 4+ Intralum Dev, Open Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/131x242.png/dddddd/000000",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Deep necrosis of underlying tissues [deep third degree] with loss of a body part, of chin",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "PREVNAR 13",
      title: "Drainage of Right Choroid with Drain Dev, Perc Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/248x211.bmp/dddddd/000000",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Mechanical failure of instrument or apparatus during unspecified procedure",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Venlafaxine Hydrochloride",
      title: "Control Bleeding in Right Upper Arm, Perc Endo Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/117x176.bmp/dddddd/000000",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Mild nonproliferative diabetic retinopathy",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Fresh Baby Scent Soothing Jelly",
      title: "Supplement R Foot Muscle with Autol Sub, Perc Endo Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/144x187.png/dddddd/000000",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Oligohydramnios, antepartum condition or complication",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "ShopRite Pain Relief PM",
      title: "Supplement L Glenoid Cav with Autol Sub, Perc Endo Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/242x138.png/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Spontaneous abortion, complicated by metabolic disorder, complete",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Degree Girl Just Dance",
      title: "Occlusion R Ext Jugular Vein w Extralum Dev, Perc Endo",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/239x164.bmp/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Infections of nipple associated with childbirth, postpartum condition or complication",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Zarontin",
      title: "Dilation of L Axilla Art with Intralum Dev, Perc Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/141x236.png/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Injury to trigeminal nerve",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "VUMON",
      title: "Bypass R Axilla Art to L Extracran Art w Autol Art, Open",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/150x115.bmp/5fa2dd/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Benign neoplasm of rectum and anal canal",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "TOMMY GIRL ANTIPERSPIRANT",
      title: "Revision of Nonaut Sub in T-lum Jt, Perc Endo Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/219x236.bmp/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Closed dislocation of finger, unspecified part",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "ciprofloxacin",
      title: "Release Right Kidney, Percutaneous Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/218x134.jpg/dddddd/000000",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Infection of tracheostomy",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Doxazosin",
      title: "Removal of Synth Sub from C-thor Jt, Open Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/201x168.jpg/ff4444/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Chronic total occlusion of coronary artery",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Metoprolol Tartrate",
      title: "Excision of Lower Back, Open Approach, Diagnostic",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/230x181.png/ff4444/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Combinations of opioid type drug with any other drug dependence, episodic",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "good sense antacid",
      title: "Extirpation of Matter from Nasal Septum, Perc Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/234x168.jpg/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Myogenic ptosis",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Kids Crest",
      title: "Drainage of Cul-de-sac with Drainage Device, Open Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/100x231.png/5fa2dd/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Wrist drop (acquired)",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Egg Yolk",
      title: "Replace of Nasal Septum with Synth Sub, Perc Endo Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/103x250.jpg/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Other specified arthropod-borne viral diseases",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Cover Fx Blemish Treatment Concealer N Deep",
      title: "Dilate Mid Colic Art, Bifurc, w 3 Drug-elut, Open",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/139x102.jpg/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Tuberculosis of intrathoracic lymph nodes, bacteriological or histological examination not done",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "SHISEIDO THE SKINCARE TINTED MOISTURE PROTECTION",
      title: "Extirpation of Matter from Left Renal Artery, Open Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/215x108.bmp/dddddd/000000",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Dermatitis due to unspecified substance taken internally",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Cultivated Oat",
      title: "Excision of Right Ventricle, Percutaneous Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/130x134.png/ff4444/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Open fracture of C1-C4 level with anterior cord syndrome",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "SEROQUEL",
      title: "Occlusion R Up Lobe Bronc w Intralum Dev, Perc Endo",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/153x215.jpg/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Tuberculosis of thyroid gland, unspecified",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Alprazolam",
      title: "Supplement L Temporal Bone w Autol Sub, Perc Endo",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/130x171.bmp/ff4444/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Personal history of poisoning, presenting hazards to health",
      isPublished: false,
      author: defaultUser._id,
    },

    {
      pouet: "Isosorbide Dinitrate",
      title: "Release Right Upper Arm Tendon, Percutaneous Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/117x193.bmp/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Burkitt's tumor or lymphoma, spleen",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet:
        "TERRACOTTA JOLI TEINT BEAUTIFYING FOUNDATION WITH SUNSCREEN SUN-KISSED, HEALTHY GLOW BROAD SPECTRUM SPF 20 NATURAL",
      title: "Fluoroscopy of Ileal Diversion Loop using L Osm Contrast",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/203x157.png/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Tuberculosis of lung with cavitation, tubercle bacilli found (in sputum) by microscopy",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Nighttime Sleep Aid",
      title: "Remove Tissue Expander from Up Extrem Subcu/Fascia, Perc",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/108x248.jpg/ff4444/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        '"Light-for-dates"without mention of fetal malnutrition, 1,250- 1,499 grams',
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Gianvi",
      title: "Change Other Device in Brain, External Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/189x163.png/ff4444/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Illegally induced abortion, complicated by embolism, complete",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "PURIFIED WATER",
      title: "Removal of Drain Dev from Tracheobronc Tree, Via Opening",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/139x181.png/cc0000/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Nervous system complications from surgically implanted device",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Losartan Potassium",
      title: "Excision of Esophagus, Via Opening, Diagn",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/101x123.png/5fa2dd/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Unspecified adverse effect of other drug, medicinal and biological substance",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Banana Boat Deep Tanning Dry SPF 8",
      title: "Replace R Thumb Phalanx w Autol Sub, Perc Endo",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/145x196.jpg/5fa2dd/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Open wound of nose, unspecified site, complicated",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Daysee",
      title: "Dilation of Right Hand Artery, Bifurcation, Open Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/189x209.bmp/ff4444/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Nonspecific (abnormal) findings on radiological and other examination of abdominal area, including retroperitoneum",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Cyanocobalamin",
      title: "Removal of Autol Sub from Lum Disc, Perc Endo Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/140x222.png/5fa2dd/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Nephritis and nephropathy, not specified as acute or chronic, with lesion of rapidly progressive glomerulonephritis",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Vineyard Antibacterial Foaming Hand Wash",
      title: "Drainage of Upper Artery, Percutaneous Approach, Diagnostic",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/226x248.bmp/dddddd/000000",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Toxoplasmosis of other specified sites",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Coppertone ultraGUARD Sunscreen",
      title: "Removal of Synthetic Substitute from Vas Deferens, Endo",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/146x212.jpg/dddddd/000000",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Open wound of wrist, complicated",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Ciprofloxacin",
      title: "Restrict Esophagast Junct w Extralum Dev, Perc Endo",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/155x185.bmp/ff4444/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Amniotic fluid embolism, delivered, with mention of postpartum complication",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Duet DHA",
      title: "Revision of Synth Sub in L Pelvic Bone, Extern Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/193x103.jpg/5fa2dd/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Hypertrophy of tongue papillae",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "Amoxicillin and Clavulanate Potassium",
      title: "Supplement Upper Artery with Synth Sub, Perc Endo Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/203x190.bmp/dddddd/000000",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Injury to other intra-abdominal organs with open wound into cavity, unspecified intra-abdominal organ",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Bethanechol Chloride",
      title: "Removal of Int Fix from L Low Femur, Extern Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/185x116.jpg/ff4444/ffffff",

      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Other noncollision motor vehicle traffic accident injuring unspecified person",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Health Mart fexofenadine hydrochloride",
      title: "Detachment at Right Thumb, High, Open Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/163x165.bmp/dddddd/000000",
      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Mechanical loosening of prosthetic joint",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "POA ANNUA POLLEN",
      title: "Replacement of R Com Iliac Art with Synth Sub, Open Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/154x136.png/dddddd/000000",
      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Spontaneous abortion, complicated by genital tract and pelvic infection, unspecified",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet:
        "LOreal Paris Men Expert Vita Lift Daily Moisturizer Sunscreen Broad Spectrum SPF 15",
      title: "Supplement R Low Leg Muscle w Nonaut Sub, Perc Endo",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/103x242.bmp/cc0000/ffffff",
      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Pulmonary alveolar proteinosis",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Phenobarbital",
      title: "Revise Infusion Dev in R Metacarpocarp Jt, Extern",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/160x122.jpg/ff4444/ffffff",
      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Open fracture of first cervical vertebra",
      isPublished: true,
      author: defaultUser._id,
    },
    {
      pouet: "California Mugwort",
      title: "Replace of R Mandible with Nonaut Sub, Perc Endo Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/183x196.bmp/5fa2dd/ffffff",
      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2: "Closed fracture of six ribs",
      isPublished: false,
      author: defaultUser._id,
    },
    {
      pouet: "Proactiv",
      title: "Bypass L Atrium to R Pulm Art with Autol Vn, Open Approach",
      image_url: photos[Math.floor(Math.random() * photos.length)],
      test: "http://dummyimage.com/153x199.jpg/5fa2dd/ffffff",
      article: loremIpsum({
        count: 6, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      test2:
        "Cardiac catheterization as the cause of abnormal reaction of patient, or of later complication, without mention of misadventure at time of procedure",
      isPublished: true,
      author: defaultUser._id,
    },
  ] as unknown) as Blog[]);

  return defaultUser;
}
