import DataLoader from "dataloader";
import { UserModel, User } from "../entities/User";
import { ObjectId } from "mongodb";

export const createUserLoader = () =>
  new DataLoader<ObjectId, User>(async (userIds) => {
    try {
      const users = await UserModel.find({
        _id: {
          $in: userIds as ObjectId[],
        },
      });

      const userIdToUser: Record<string, User> = {};

      users.forEach((u) => {
        userIdToUser[u.id] = u;
      });

      const sortedUsers = userIds.map((userId) => userIdToUser[String(userId)]);

      return sortedUsers;
    } catch (err) {
      throw err;
    }
  });
