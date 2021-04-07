import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import {
  AddShoeMutation,
  useAddImageMutation,
  useAddShoeMutation,
  useAddVariantMutation,
  useUpdateImageMutation,
  useUpdateShoeMutation,
  useUpdateVariantMutation,
} from "../../generated/graphql";
import GeneralForm from "./GeneralForm";
import ImageForm from "./ImageForm";
import VariantForm from "./VariantForm";
import { compareObject } from "../../utils/compareObject";
import { useAlert } from "react-alert";

interface Image {
  _id?: string;
  src: string;
}

interface Variants {
  _id?: string;
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
  const [eventImage] = fetchValues
    ? useUpdateImageMutation()
    : useAddImageMutation();
  const [eventVariant] = fetchValues
    ? useUpdateVariantMutation()
    : useAddVariantMutation();
  const [addVariant] = useAddVariantMutation();
  const alert = useAlert();
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
    relatives: [],
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
            tags: values.initialtags,
          };

          const filteredShoes = compareObject(shoes, initialShoes);

          const shoesVariable = {
            ...(fetchValues && {
              shoeId: fetchValues?._id as string,
              ...filteredShoes,
            }),
            ...(!fetchValues && {
              ...shoes,
              is_published: false,
              relatives: relatives,
            }),
          };

          let { data } =
            Object.keys(shoesVariable).length > 1
              ? await eventShoes({
                  variables: {
                    ...(shoesVariable as any),
                  },
                })
              : { data: null };

          const addedId = data as AddShoeMutation;

          variants.forEach(async (variant, index) => {
            const filteredVariant =
              variant._id && fetchValues
                ? compareObject(variant, initialVariants[index])
                : {};

            const variantVariable = {
              ...(fetchValues &&
                Object.keys(filteredVariant).length > 0 &&
                variant._id && {
                  variantId: variant._id as string,
                  ...filteredVariant,
                  available: variant.quantity > 0 ? true : false,
                }),
              ...(!fetchValues && {
                ...variant,
                price: variant.price ? variant.price : values.price,
                grams: shoes.grams,
                available: variant.quantity > 0 ? true : false,
                parentId: addedId.addShoe,
                product_id: addedId.addShoe,
              }),
            };

            if (fetchValues && !variant._id) {
              await addVariant({
                variables: {
                  ...variant,
                  price: variant.price ? variant.price : values.price,
                  grams: shoes.grams,
                  available: variant.quantity > 0 ? true : false,
                  parentId: initialShoes._id,
                  product_id: initialShoes._id,
                },
              });
            }

            if (Object.keys(variantVariable).length > 0) {
              await eventVariant({
                variables: {
                  ...(variantVariable as any),
                },
              });
            }
          });

          images.forEach(async (image, index) => {
            const filteredImage = compareObject(image, initialImages[index]);

            const imageVariable = {
              ...(fetchValues &&
                Object.keys(filteredImage).length > 0 && {
                  imageId: image._id as string,
                  ...filteredImage,
                  position: index,
                }),
              ...(!fetchValues && {
                ...image,
                parentId: addedId.addShoe,
                position: index,
                product_id: addedId.addShoe,
              }),
            };

            if (image.src && Object.keys(imageVariable).length > 0) {
              await eventImage({
                variables: {
                  ...(imageVariable as any),
                },
              });
            }
          });

          alert.success("It's ok now!");

          if (!fetchValues) resetForm({});
        } catch (err) {
          throw err;
        }
      }}
    >
      {({ values }) => (
        <Form>
          {current === 0 && <GeneralForm {...values} />}
          {current === 1 && <ImageForm images={values.images} />}
          {current === 2 && (
            <VariantForm size={values.size} variants={values.variants} />
          )}
          <Button type="submit" fullWidth variant="contained" color="primary">
            {fetchValues ? "Modifier Produit" : "Ajouter Produit"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default React.memo(ShoesForm);
