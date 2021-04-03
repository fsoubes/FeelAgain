import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import {
  AddVariantDocument,
  useAddImageMutation,
  useAddShoeMutation,
  useAddVariantMutation,
} from "../../generated/graphql";
import GeneralForm from "./GeneralForm";
import ImageForm from "./ImageForm";
import VariantForm from "./VariantForm";

interface ShoesFormProps {
  current: number;
}

const ShoesForm: React.FC<ShoesFormProps> = ({ current }) => {
  const [addShoes] = useAddShoeMutation();
  const [addImages] = useAddImageMutation();
  const [addVariant] = useAddVariantMutation();

  const size = [35, 36, 37, 38, 39, 40, 41, 42];

  return (
    <Formik
      initialValues={{
        title: "",
        vendor: "",
        product_type: "",
        body_html: "",
        grams: 1,
        price: 1,
        compare_at_price: "",
        colors: ["Blanc"],
        heel: 0,
        size: size,
        tags: ["Cuir", "Noir"],
        relatives: ["6061007551eeea01f597c852"],
        images: new Array(4).fill({ src: "" }),
        variants: size.map((item) => {
          return {
            title: item.toString(),
            quantity: 0,
            featured_image: "",
            price: 0,
          };
        }),
        is_published: false,
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          let { variants, images, ...shoes } = { ...values };

          const tags = [
            ...values.tags,
            values.heel ? `${values.heel} cm` : "pas de talon",
            ...values.colors,
          ];

          const handle = `${values.title}-${values.tags.join(
            "-"
          )}-${values.colors.join("-")}`;

          const { data } = await addShoes({
            variables: {
              ...shoes,
              is_published: false,
              handle: handle,
              tags: tags,
            },
          });

          if (data?.addShoe) {
            for (const variant of variants) {
              await addVariant({
                variables: {
                  ...variant,
                  price: variant.price ? variant.price : values.price,
                  grams: shoes.grams,
                  available: variant.quantity > 0 ? true : false,
                  parentId: data.addShoe,
                  product_id: data.addShoe,
                },
              });
            }

            images.forEach(async (image, index) => {
              if (image.src) {
                await addImages({
                  variables: {
                    ...image,
                    parentId: data.addShoe,
                    position: index,
                    product_id: data.addShoe,
                  },
                });
              }
            });
          }

          resetForm({});
        } catch (err) {
          throw err;
        }
      }}
    >
      {({ isSubmitting, errors, values }) => (
        <Form>
          {current === 0 && <GeneralForm {...values} />}
          {current === 1 && <ImageForm images={values.images} />}
          {current === 2 && (
            <VariantForm size={values.size} variants={values.variants} />
          )}
          <Button type="submit" fullWidth variant="contained" color="primary">
            Ajouter Produit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default ShoesForm;
