import DataLoader from "dataloader";
import { ObjectId } from "mongodb";
import { CartItemModel, CartItem } from "./../entities/CartItem";

export const createCartItemLoader = (isCart = false) =>
  new DataLoader<ObjectId, CartItem>(async (itemIds) => {
    try {
      const items = await CartItemModel.find({
        _id: {
          $in: itemIds as ObjectId[],
        },
      });

      const variantIdToVariant: Record<string, CartItem> = {};

      items.forEach((u) => {
        variantIdToVariant[u.id] = u;
      });

      const sortedItems = itemIds.map(
        (itemId) => variantIdToVariant[String(itemId)]
      );

      return isCart ? sortedItems.reverse() : sortedItems;
    } catch (err) {
      throw err;
    }
  });
