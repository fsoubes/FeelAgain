export const computeTotal = (products: any) => {
  console.log(products);
  return products.reduce((acc: number, currentValue: any) => {
    const price = currentValue.variant
      ? (currentValue.variant.price as number)
      : (currentValue.card?.price as number);
    return acc + price * (currentValue.quantity as number);
  }, 0);
};
