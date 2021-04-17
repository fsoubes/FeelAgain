import { Variants, VariantsModel } from "../entities/Variants";
import DataLoader from "dataloader";
import { ObjectId } from "mongodb";

export const createVariantLoaders = () =>
  new DataLoader<ObjectId, Variants>(async (variantIds) => {
    try {
      const variants = await VariantsModel.find({
        _id: {
          $in: variantIds as ObjectId[],
        },
      });

      const variantIdToVariant: Record<string, Variants> = {};

      variants.forEach((u) => {
        variantIdToVariant[u.id] = u;
      });

      const sortedVariants = variantIds.map(
        (variantId) => variantIdToVariant[String(variantId)]
      );

      return sortedVariants;
    } catch (err) {
      throw err;
    }
  });
