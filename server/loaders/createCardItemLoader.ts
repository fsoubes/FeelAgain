import { GiftCard, GiftCardModel } from "./../entities/GiftCard";
import DataLoader from "dataloader";
import { ObjectId } from "mongodb";

export const createCardItemLoader = () =>
  new DataLoader<ObjectId, GiftCard>(async (cardIds) => {
    try {
      const card = await GiftCardModel.find({
        _id: {
          $in: cardIds as ObjectId[],
        },
      });

      const cardIdToCard: Record<string, GiftCard> = {};

      card.forEach((u) => {
        cardIdToCard[u.id] = u;
      });

      const sortedCards = cardIds.map((cardId) => cardIdToCard[String(cardId)]);

      return sortedCards;
    } catch (err) {
      throw err;
    }
  });
