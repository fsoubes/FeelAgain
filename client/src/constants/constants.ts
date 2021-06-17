import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import Forward10Icon from "@material-ui/icons/Forward10";
import PersonIcon from "@material-ui/icons/Person";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import EditIcon from "@material-ui/icons/Edit";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

export const name = "FeelAgain";

export const sideBarMenu = [
  {
    title: "Ajouter Chaussure",
    path: "/dashboard/add",
    icon: AddShoppingCartIcon,
    sub: [],
  },
  {
    title: "Editer Chaussure",
    path: "/dashboard/update",
    icon: EditIcon,
    sub: [
      {
        title: "Recherche",
        path: "/dashboard/update/search",
        icon: SearchIcon,
      },
      {
        title: "Dernier ajouts",
        path: "/dashboard/update/latest",
        icon: Forward10Icon,
      },
    ],
  },
  {
    title: "Ajouter Article",
    path: "/dashboard/blog/add",
    icon: NoteAddIcon,
    sub: [],
  },
  {
    title: "Editer Article",
    path: "/dashboard/blog/update",
    icon: EditIcon,
    sub: [
      {
        title: "Recherche",
        path: "/dashboard/update/blog/search",
        icon: SearchIcon,
      },
      {
        title: "Dernier ajouts",
        path: "/dashboard/update/blog/latest",
        icon: Forward10Icon,
      },
    ],
  },
  {
    title: "Statistiques",
    path: "/dashboard/stats",
    icon: EqualizerIcon,
    sub: [],
  },
  {
    title: "Commandes",
    path: "/dashboard/delivery",
    icon: LocalShippingIcon,
    sub: [],
  },
  {
    title: "Utilisateurs",
    path: "/dashboard/user",
    icon: PersonIcon,
    sub: [],
  },
];

export const productType = [
  "Ballerines",
  "Boots",
  "Bottes",
  "Derbies",
  "Escarpins",
  "Mules",
  "Sandales",
];

export const themes = [
  "Sport",
  "Voyage",
  "Animaux",
  "Mode",
  "Musique",
  "Technologie",
  "Lecture",
];

export const paletteShoes = [
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

export const matShoes = [
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

export const heelsShoes = [
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
