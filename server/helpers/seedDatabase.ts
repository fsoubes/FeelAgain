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
  "/front/photo-1423768164017-3f27c066407f.jpg",
  "/front/photo-1443916568596-df5a58c445e9.jpg",
  "/front/photo-1446776877081-d282a0f896e2.jpg",
  "/front/photo-1449157291145-7efd050a4d0e.jpg",
  "/front/photo-1451187580459-43490279c0fa.jpg",
  "/front/photo-1464938050520-ef2270bb8ce8.jpg",
  "/front/photo-1469564104555-19d9cf02b407.jpg",
  "/front/photo-1470093851219-69951fcbb533.jpg",
  "/front/photo-1477959858617-67f85cf4f1df.jpg",
  "/front/photo-1486578077620-8a022ddd481f.jpg",
  "/front/photo-1488330890490-c291ecf62571.jpg",
  "/front/photo-1488590528505-98d2b5aba04b.jpg",
  "/front/photo-1490645935967-10de6ba17061.jpg",
  "/front/photo-1496387314164-18b0105f7553.jpg",
  "/front/photo-1497294815431-9365093b7331.jpg",
  "/front/photo-1504113888839-1c8eb50233d3.jpg",
  "/front/photo-1505816014357-96b5ff457e9a.jpg",
  "/front/photo-1512921929709-6f1ff6aca605.jpg",
  "/front/photo-1516280030429-27679b3dc9cf.jpg",
  "/front/photo-1519707574798-77140649cfe5.jpg",
  "/front/photo-1519748771451-a94c596fad67.jpg",
  "/front/photo-1521334884684-d80222895322.jpg",
  "/front/photo-1526374965328-7f61d4dc18c5.jpg",
  "/front/photo-1534653299134-96a171b61581.jpg",
  "/front/photo-1563863251222-11d3e3bd3b62.jpg",
  "/front/photo-1579008739251-f762aee3e339.jpg",
  "/front/photo-1581833971358-2c8b550f87b3.jpg",
  "/front/photo-1582567653022-156b30b3ad34.jpg",
  "/front/photo-1601513445498-5dbffc8d5d5a.jpg",
  "/front/photo-1601924638867-3a6de6b7a500.jpg",
  "/front/photo-1606787366850-de6330128bfc.jpg",
  "/front/photo-1618616058461-9b827bc808e3.jpg",
];

const back = [
  "/back/photo-1512850183-6d7990f42385.jpg",
  "/back/photo-1543946207-39bd91e70ca7.jpg",
  "/back/photo-1546146477-15a587cd3fcb.jpg",
  "/back/photo-1549887534-1541e9326642.jpg",
  "/back/photo-1553356084-58ef4a67b2a7.jpg",
  "/back/photo-1496284045406-d3e0b918d7ba.jpg",
  "/back/photo-1518531933037-91b2f5f229cc.jpg",
  "/back/photo-1533003505519-6a9b92ed4911.jpg",
  "/back/photo-1586455122341-927f2dec0691.jpg",
  "/back/photo-1617140237060-d09a58ba8edd.jpg",
];

const themes = [
  "Sport",
  "Voyage",
  "Animaux",
  "Mode",
  "Musique",
  "Technologie",
  "Lecture",
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
      title: "Restrict L Ext Iliac Vein w Intralum Dev, Perc",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],
      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Drainage of Left Lacrimal Bone, Perc Endo Approach, Diagn",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],
      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Insert of Intralum Dev into R Innom Vein, Perc Endo Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],
      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Supplement R Verteb Vein with Nonaut Sub, Open Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],
      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Change Packing Material on Left Hand",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Bypass Gastric Vein to Low Vein w Synth Sub, Open",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Insertion of Ext Fix into L Humeral Head, Open Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Supplement Right Axilla with Synth Sub, Open Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Drainage of Jejunum, Open Approach, Diagnostic",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],
      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Dilate of R Ant Tib Art with 4+ Intralum Dev, Open Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Drainage of Right Choroid with Drain Dev, Perc Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Control Bleeding in Right Upper Arm, Perc Endo Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Supplement R Foot Muscle with Autol Sub, Perc Endo Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Supplement L Glenoid Cav with Autol Sub, Perc Endo Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Occlusion R Ext Jugular Vein w Extralum Dev, Perc Endo",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Dilation of L Axilla Art with Intralum Dev, Perc Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Bypass R Axilla Art to L Extracran Art w Autol Art, Open",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Revision of Nonaut Sub in T-lum Jt, Perc Endo Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Release Right Kidney, Percutaneous Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Removal of Synth Sub from C-thor Jt, Open Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Excision of Lower Back, Open Approach, Diagnostic",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Extirpation of Matter from Nasal Septum, Perc Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Drainage of Cul-de-sac with Drainage Device, Open Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Replace of Nasal Septum with Synth Sub, Perc Endo Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Dilate Mid Colic Art, Bifurc, w 3 Drug-elut, Open",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Extirpation of Matter from Left Renal Artery, Open Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Excision of Right Ventricle, Percutaneous Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Occlusion R Up Lobe Bronc w Intralum Dev, Perc Endo",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Supplement L Temporal Bone w Autol Sub, Perc Endo",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },

    {
      title: "Release Right Upper Arm Tendon, Percutaneous Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Fluoroscopy of Ileal Diversion Loop using L Osm Contrast",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Remove Tissue Expander from Up Extrem Subcu/Fascia, Perc",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Change Other Device in Brain, External Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Removal of Drain Dev from Tracheobronc Tree, Via Opening",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Excision of Esophagus, Via Opening, Diagn",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Replace R Thumb Phalanx w Autol Sub, Perc Endo",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Dilation of Right Hand Artery, Bifurcation, Open Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Removal of Autol Sub from Lum Disc, Perc Endo Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Drainage of Upper Artery, Percutaneous Approach, Diagnostic",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Removal of Synthetic Substitute from Vas Deferens, Endo",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Restrict Esophagast Junct w Extralum Dev, Perc Endo",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Revision of Synth Sub in L Pelvic Bone, Extern Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Supplement Upper Artery with Synth Sub, Perc Endo Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Removal of Int Fix from L Low Femur, Extern Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Detachment at Right Thumb, High, Open Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Replacement of R Com Iliac Art with Synth Sub, Open Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Supplement R Low Leg Muscle w Nonaut Sub, Perc Endo",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Revise Infusion Dev in R Metacarpocarp Jt, Extern",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
    {
      title: "Replace of R Mandible with Nonaut Sub, Perc Endo Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: false,
      author: defaultUser._id,
    },
    {
      title: "Bypass L Atrium to R Pulm Art with Autol Vn, Open Approach",
      image_back: back[Math.floor(Math.random() * (back as string[]).length)],
      image_url: photos[Math.floor(Math.random() * photos.length)],

      article: loremIpsum({
        count: 15, // Number of "words", "sentences", or "paragraphs"
        format: "plain", // "plain" or "html"
        paragraphLowerBound: 10, // Min. number of sentences per paragraph.
        paragraphUpperBound: 15, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 10, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
      }),
      tags: themes[Math.floor(Math.random() * (themes as string[]).length)],

      is_published: true,
      author: defaultUser._id,
    },
  ] as unknown) as Blog[]);

  return defaultUser;
}
