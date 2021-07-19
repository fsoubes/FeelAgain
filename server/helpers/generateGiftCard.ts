export const generateCard = () => {
  return `feelagain_${Math.random()
    .toString(36)
    .substring(15)}`;
};
