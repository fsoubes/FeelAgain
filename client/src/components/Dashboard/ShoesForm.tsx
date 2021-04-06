import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import {
  AddShoeMutation,
  useAddImageMutation,
  useAddShoeMutation,
  useAddVariantMutation,
  useUpdateShoeMutation,
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
  _id: string;
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
  initialtags: string[];
  relatives: string[];
  images: Image[];
  variants: Variants[];
  is_published: Boolean;
}

interface ShoesFormProps {
  current: number;
  fetchValues?: Initializer;
}

const ShoesForm: React.FC<ShoesFormProps> = ({ current, fetchValues }) => {
  const [eventShoes] = fetchValues
    ? useUpdateShoeMutation()
    : useAddShoeMutation();
  const [addImages] = useAddImageMutation();
  const [addVariant] = useAddVariantMutation();

  const size = [35, 36, 37, 38, 39, 40, 41, 42];

  const intialValues: Initializer = {
    _id: "",
    initialtags: [""],
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
    tags: ["Cuir"],
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
      initialValues={fetchValues ? fetchValues : intialValues}
      onSubmit={async (values, { resetForm }) => {
        try {
          const tags = [
            ...values.tags,
            values.heel ? `${values.heel} cm` : "pas de talon",
            ...values.colors,
          ];

          const handle = `${values.title.replace(/ /g, "-")}-${values.tags.join(
            "-"
          )}-${values.colors.join("-")}`;

          let { variants, images, relatives, ...shoes } = {
            ...values,
            tags: tags,
            handle: handle,
          };

          let {
            variants: initialVariants,
            images: initialImages,
            relatives: initialRelatives,
            ...initialShoes
          } = {
            ...(fetchValues as Initializer),
          };

          const filtered = Object.keys(shoes)
            .filter((item: string) => {
              return (
                JSON.stringify((initialShoes as any)[item]) !==
                JSON.stringify((shoes as any)[item])
              );
            })
            .reduce((obj, key) => {
              (obj as any)[key] = (shoes as any)[key];
              return obj;
            }, {});

          const shoesVariables = {
            ...(fetchValues && {
              shoeId: fetchValues?._id as string,
              ...filtered,
            }),
            ...(!fetchValues && {
              ...shoes,
              is_published: false,
              relatives: relatives,
            }),
          };

          let { data } = await eventShoes({
            variables: {
              ...(shoesVariables as any),
            },
          });

          if (!fetchValues) {
            const addedId = data as AddShoeMutation;
            for (const variant of variants) {
              await addVariant({
                variables: {
                  ...variant,
                  price: variant.price ? variant.price : values.price,
                  grams: shoes.grams,
                  available: variant.quantity > 0 ? true : false,
                  parentId: addedId.addShoe,
                  product_id: addedId.addShoe,
                },
              });
            }

            images.forEach(async (image, index) => {
              if (image.src) {
                await addImages({
                  variables: {
                    ...image,
                    parentId: addedId.addShoe,
                    position: index,
                    product_id: addedId.addShoe,
                  },
                });
              }
            });

            resetForm({});
          } else {
            const filteredImage = images.filter((item: Image, index) => {});

            const filteredVariant = variants.filter(
              (item: Variants, index) => {}
            );
          }
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
export default React.memo(ShoesForm);
