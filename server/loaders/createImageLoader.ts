import DataLoader from "dataloader";
import { ImagesModel, Images } from "../entities/Images";
import { ObjectId } from "mongodb";

export const createImageLoader = () =>
  new DataLoader<ObjectId, Images>(async (imageIds) => {
    try {
      const images = await ImagesModel.find({
        _id: {
          $in: imageIds as ObjectId[],
        },
      });

      const imageIdToImage: Record<string, Images> = {};

      images.forEach((u) => {
        imageIdToImage[u.id] = u;
      });

      const sortedImages = imageIds.map(
        (imageId) => imageIdToImage[String(imageId)]
      );

      return sortedImages;
    } catch (err) {
      throw err;
    }
  });
