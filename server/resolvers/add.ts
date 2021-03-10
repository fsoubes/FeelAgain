import { MyContext } from "./../type";
import { Resolver, Mutation, Ctx } from "type-graphql";
import { Shoes, ShoesModel } from "../entities/Shoes";
import { readJSON } from "../helpers/readJson";
import { VariantsModel } from "../entities/Variants";
import { ImagesModel } from "../entities/Images";

@Resolver((_of) => Shoes)
export class AddResolver {
  @Mutation(() => Boolean)
  async addShoes(@Ctx() {  }: MyContext) {
    const data = readJSON("./data/anaki.json");
    try {
      for (let i = 0; i <= data.length; i++) {
        if (!data[i]) {
          continue;
        }
        let { images, variants, ...partialObject } = data[i];
        const shoes = new ShoesModel({ ...partialObject });

        for (let j = 0; j < variants.length; j++) {
          const addVariants = new VariantsModel({
            ...variants[j],
            product_id: shoes._id,
            quantity: Math.floor(Math.random() * 50) + 1,
          });
          await addVariants.save();
          shoes.variants.push(addVariants._id);
        }

        for (let k = 0; k < images.length; k++) {
          const addImages = new ImagesModel({
            ...images[k],
            product_id: shoes._id,
          });
          await addImages.save();
          shoes.images.push(addImages._id);
        }

        await shoes.save();
      }
      return true;
    } catch (err) {
      throw err;
    }
  }
}
