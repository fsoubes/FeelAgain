const hex = [
  "#fff",
  "#cd7f32",
  "#fad6a5",
  "#d4af37",
  "#b5b5bd",
  "#f2e7bf",
  "#0000ff",
  "#6d071a",
  "#d2a579",
  "#fce903",
  "#6e4c4b",
  "#000",
  "#fc9303",
  "#fd6c9e",
  "#cc0000",
  "#49b675",
];

// alt +  shift  +l
// ctrl + ""
const myCol = [
  "Blanc",
  "Bronze",
  "Champagne",
  "Or",
  "Argenté",
  "Beige",
  "Bleu",
  "Bordeaux",
  "Camel",
  "Jaune",
  "Marron",
  "Noir",
  "Orange",
  "Rose",
  "Rouge",
  "Vert",
];

const mat = [
  "Cuir",
  "Cuir Imprimé Python",
  "Cuir Métallisé",
  "Cuir Verni",
  "Cuir Glitter",
  "Cuir Métal",
  "Cuir Nubuck",
  "Glitter",
  "Glitter Fin",
  "Nubuck",
  "Nubuck Façon Caïman",
  "Nubuck Façon Python",
  "Nubuck Imprimé",
  "Nubuck Métallisé",
  "Nubuck Métallisé Glitter",
  "Nubuck Python Glitter",
  "Nubuck Glitter",
  "Suède",
  "Suède Glitter",
];

const heel = [
  "pas de talon",
  "1 cm",
  "2 cm",
  "2.5 cm",
  "3 cm",
  "4.5 cm",
  "5 cm",
  "5.5 cm",
  "6 cm",
  "6.5 cm",
  "7 cm",
  "8 cm",
  "8.5 cm",
  "9 cm",
];

interface Color {
  checked: boolean;
  hex: string;
  color: string;
}

interface Size {
  size: number;
  checked: boolean;
}

interface ValueProps {
  [key: string]: boolean;
}

const sizes = [...(new Array(10) as Size[])].reduce(
  (acc, __, index) => {
    acc.push({ checked: false, size: acc[index].size + 1 });
    return acc as Size[];
  },
  [{ checked: false, size: 35 }] as Size[]
);

const colors = myCol.reduce((acc, item, index) => {
  acc.push({ checked: false, color: item, hex: hex[index] });
  return acc;
}, [] as Color[]);

const materials = mat.reduce((acc, item) => {
  (acc as any)[item] = false;
  return acc;
}, {} as Record<keyof ValueProps, boolean>);

const heels = heel.reduce((acc, item) => {
  (acc as any)[item] = false;
  return acc;
}, {} as Record<keyof ValueProps, boolean>);

const categories = {
  Ballerines: false,
  Boots: false,
  Bottes: false,
  Bottines: false,
  Derbies: false,
  Escarpins: false,
  Mules: false,
  Mocassins: false,
  Sandales: false,
};

const variables = { size: [], tags: [] };

export const initialValues = {
  sizes,
  categories,
  heels,
  materials,
  colors,
  variables,
};
