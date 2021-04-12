export interface ValueProps {
  [key: string]: boolean;
}

export interface Color {
  checked: boolean;
  hex: string;
  color: string;
}

export interface Request {
  tags?: string[];
  size?: number[];
  product?: String;
}

export interface Size {
  size: number;
  checked: boolean;
}

export type UpdateFilterAction = {
  type: string;
  key?: string;
  index?: number;
  field?: string;
  values?: FilterList;
  value?: string | number;
  checked?: boolean;
};

export interface FilterList {
  heels?: ValueProps;
  categories?: ValueProps;
  materials?: ValueProps;
  colors?: Color[];
  sizes?: Size[];
  variables?: Request;
}
