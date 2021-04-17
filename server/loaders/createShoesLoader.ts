import DataLoader from "dataloader";
import { ObjectId } from "mongodb";
import { ShoesModel, Shoes } from "../entities/Shoes";

export const createShoesLoader = () =>
  new DataLoader<ObjectId, Shoes>(async (shoesIds) => {
    try {
      const shoes = await ShoesModel.find({
        _id: {
          $in: shoesIds as ObjectId[],
        },
      });

      const userIdToUser: Record<string, Shoes> = {};

      shoes.forEach((u) => {
        userIdToUser[String(u._id)] = u;
      });

      const sortedUsers = shoesIds.map(
        (userId) => userIdToUser[String(userId)]
      );

      return sortedUsers;
    } catch (err) {
      throw err;
    }
  });
