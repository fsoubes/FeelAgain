import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import {
  Shoes,
  useAddImageMutation,
  useAddShoeMutation,
  useAddVariantMutation,
} from "../../generated/graphql";
import GeneralForm from "./GeneralForm";
import ImageForm from "./ImageForm";
import VariantForm from "./VariantForm";

interface Image {
  src: string;
}

interface Variants {
  title: string;
  quantity: number;
  featured_image: string;
  price: number;
}
interface Initializer {
  title: string;
  vendor: string;
  product_type: string;
  body_html: string;
  grams: number;
  price: number;
  compare_at_price: string | number;
  colors: string[];
  heel: number;
  size: number[];
  tags: string[];
  relatives: string[];
  images: Image[];
  variants: Variants[];
  is_published: Boolean;
}

interface ShoesFormProps {
  current: number;
  data?: Initializer;
}

const ShoesForm: React.FC<ShoesFormProps> = ({ current, data }) => {
  const [addShoes] = useAddShoeMutation();
  const [addImages] = useAddImageMutation();
  const [addVariant] = useAddVariantMutation();

  const size = [35, 36, 37, 38, 39, 40, 41, 42];

  const intialValues: Initializer = {
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
  };

  return (
    <Formik
      initialValues={data ? data : intialValues}
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

          /*  if (data && shoes) {
            const filtered = Object.keys(data as Initializer).map((item) => {
              return data[item] === shoes[item];
            });
            console.log(filtered);
          }
            */
          /*  const { data } = await addShoes({
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
          } */

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
