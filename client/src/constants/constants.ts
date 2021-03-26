export const name = "FeelAgain";

export const sideBarMenu = [
  { title: "Ajouter", path: "/dashboard/add", icon: "null", sub: [] },
  {
    title: "Modifier",
    path: "/dashboard/update",
    icon: "null",
    sub: [
      { title: "Recherche", path: "/dashboard/update/search", icon: "null" },
      {
        title: "Dernier ajouts",
        path: "/dashboard/update/latest",
        icon: "null",
      },
    ],
  },
  { title: "Statistiques", path: "/dashboard/stats", icon: "null", sub: [] },
  { title: "Commandes", path: "/dashboard/delivery", icon: "null", sub: [] },
];
