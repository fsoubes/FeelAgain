import { IBlog, Initializer } from "../types/dashboard";

const size = [35, 36, 37, 38, 39, 40, 41, 42];

export const intialValues: Initializer = {
  _id: "",
  initialtags: [""],
  title: "",
  vendor: "",
  product_type: "",
  body_html: "",
  grams: 1,
  price: 1,
  compare_at_price: "",
  colors: ["Blanc"],
  heel: 0,
  size: size,
  tags: ["Cuir"],
  relatives: [],
  images: new Array(4).fill({ src: "" }),
  variants: size.map((item) => {
    return {
      title: item.toString(),
      quantity: 0,
      featured_image: "",
      price: 0,
    };
  }),
  is_published: false,
};

export const initialValuesBlog: IBlog = {
  title: "",
  image_url: "",
  image_back: "",
  tags: "",
  source: [],
  social: [],
  isPublished: false,
};
