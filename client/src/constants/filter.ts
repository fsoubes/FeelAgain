const hex = ["#fff", "#ff0000", "#000"];

const mat = [
  "Cuir",
  "Cuir imprimé python",
  "Cuir métallisé",
  "Cuir verni",
  "Cuir+glitter",
  "Cuir+métal",
  "Cuir+nubuck",
  "Glitter",
  "Glitter fin",
  "Nubuck",
  "Nubuck façon caïman",
  "Nubuck façon python",
  "Nubuck imprimé",
  "Nubuck métallisé",
  "Nubuck métallisé+glitter",
  "Nubuck python+glitter",
  "Nubuck+glitter",
  "Suède",
  "Suède+glitter",
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

const colors = ["Blanc", "Rouge", "Noir"].reduce((acc, item, index) => {
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
  Mulles: false,
  Mocassins: false,
  Sandales: false,
};

export const initialValues = {
  sizes,
  categories,
  heels,
  materials,
  colors,
};
