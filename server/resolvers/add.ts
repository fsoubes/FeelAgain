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
    const filenames=["anakiFiltered","patriciaFiltered"]
    try {
      for(const name of filenames){
      const data = readJSON(`./data/${name}.json`);
      for (let i = 0; i <= data.length; i++) {
        if (!data[i] || data[i].product_type === "gif" ) {
          continue;
        }

        let { images, variants, ...partialObject } = data[i];
        const shoes = new ShoesModel({ ...partialObject,price: parseInt(partialObject.price,) , is_published:true});

        for (let j = 0; j < variants.length; j++) {
          const addVariants = new VariantsModel({
            ...variants[j],
            product_id: shoes._id,
            price: parseInt(variants[j].price),
            compare_at: parseInt(variants[j].compare_at_price),
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
      
    }
    return true;
    } catch (err) {
      throw err;
    }
  }
  @Mutation(() => Boolean)
  async addRelation() {
    try {
      for await (const doc of ShoesModel.find().cursor()) {
        for await (const item of doc.switchLinks) { 
          const switchShoes = await ShoesModel.findOne({ id: item });
          if (item === doc.id) {
            doc.switchTitle.push(doc.handle)
            await doc.save()
          } else {
            doc.relatives.push(switchShoes?._id);
            doc.switchTitle.push(switchShoes?.handle)
            await doc.save()
          }
        }
      }
      return true;
    } catch (err) {
      throw err;
    }
  }
}
