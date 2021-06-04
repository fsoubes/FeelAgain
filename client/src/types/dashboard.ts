export interface Image {
  _id?: string;
  src: string;
}

export interface Variants {
  _id?: string;
  title: string;
  quantity: number;
  featured_image: string;
  price: number;
}

export interface IBlog {
  _id: string;
  title: string;
  image_url: string;
  image_back: string;
  tags: string;
  source: string[];
  social: string[];
  isPublished: boolean;
  article: string;
}

export interface Initializer {
  _id: string;
  title: string;
  vendor: string;
  product_type: string;
  body_html: string;
  grams: number;
  price: number;
  compare_at_price: string | number;
  colors: string[];
  heel: number;
  size: number[];
  tags: string[];
  initialtags: string[];
  relatives: Relation[];
  images: Image[];
  variants: Variants[];
  is_published: Boolean;
}

export interface GeneralFormProps {
  tags: string[];
  colors: string[];
  size: number[];
  relatives: Relation[];
  variants: any[];
  setRelation?: React.Dispatch<React.SetStateAction<Relation[]>>;
  children: JSX.Element;
}

export interface ShoesFormProps {
  current: number;
  fetchValues?: Initializer;
}

export interface BlogFormProps {
  title: string;
  fetchValues?: IBlog;
}

export interface Relation {
  _id: string;
  title: string;
  price: number;
  images: Image[];
  vendor: string;
}

export interface SearchProps {
  children: JSX.Element;
  isAdding?: Boolean;
  setRelation?: React.Dispatch<React.SetStateAction<Relation[]>>;
}
