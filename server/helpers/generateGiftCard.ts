export const generateCard = () => {
  const r = [...Array(30)].map(() => Math.random().toString(36)[2]).join("");
  return `feelagain_${r}`;
};
