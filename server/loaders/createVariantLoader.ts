import DataLoader from "dataloader";
import { ObjectId } from "mongodb";
import { VariantsModel, Variants } from "../entities/Variants";

export const createVariantLoader = () =>
  new DataLoader<ObjectId, Variants>(async (variantIds) => {
    try {
      const variant = await VariantsModel.find({
        _id: {
          $in: variantIds as ObjectId[],
        },
      });

      const variantIdToVariant: Record<string, Variants> = {};

      variant.forEach((u) => {
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
