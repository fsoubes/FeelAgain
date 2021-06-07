import { useState, Fragment, useEffect, useCallback, memo } from "react";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import {
  AddShoeMutation,
  Shoes,
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
import { useRouter } from "next/router";
import { Initializer, Relation, ShoesFormProps } from "../../types/dashboard";
import { intialValues } from "../../constants/dashboard";
import ProductListDash from "./Product/ProductList";

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
  const router = useRouter();
  const [relations, setRelations] = useState<Relation[]>([]);

  useEffect(() => {
    if (fetchValues) {
      setRelations(fetchValues.relatives);
    }
  }, [fetchValues]);

  const handleRemove = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      id: string
    ): boolean => {
      try {
        setRelations(relations.filter((item) => item._id !== id));
        e.stopPropagation();
        return true;
      } catch (err) {
        throw err;
      }
    },
    []
  );

  /* const handleRemove = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ): Promise<void> => {
    try {
      setRelations(relations.filter((item) => item._id !== id));
      e.stopPropagation();
    } catch (err) {
      throw err;
    }
  }; */

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

          let { variants, images, ...shoes } = {
            ...values,
            tags: tags,
            handle: handle,
          };

          let {
            variants: initialVariants,
            images: initialImages,
            // relatives: initialRelatives,
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
              relatives: relations.map((item) => item._id),
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

          setTimeout(() => {
            Object.keys(shoesVariable).length > 1
              ? alert.success(
                  `Chaussure ${shoes.title} ${
                    fetchValues
                      ? "correctement modifiée"
                      : "correctement ajoutée"
                  }!`
                )
              : alert.show("Veuillez remplir le formulaire!");
          }, 500);

          const addedId = data as AddShoeMutation;

          variants.forEach(async (variant, index) => {
            try {
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
              setTimeout(() => {
                alert.success(`Pointure ${variant.title} ajoutée!`);
              }, 500);
            } catch (err) {
              throw err;
            }
          });

          images.forEach(async (image, index) => {
            try {
              const filteredImage =
                image._id && fetchValues
                  ? compareObject(image, initialImages[index])
                  : {};

              const imageVariable = {
                ...(fetchValues &&
                  Object.keys(filteredImage).length > 0 &&
                  image._id && {
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
              setTimeout(() => {
                alert.success(`Image ajoutée!`);
              }, 500);
            } catch (err) {
              throw err;
            }
          });

          alert.success("Taks are done !");

          if (!fetchValues) resetForm({});
          else router.push("/dashboard/update/latest");
        } catch (err) {
          throw err;
        }
      }}
    >
      {({ values }) => (
        <Form>
          {current === 0 && (
            <GeneralForm {...values} setRelation={setRelations}>
              <Fragment>
                {fetchValues?.relatives.length === 0 && relations.length === 0 && (
                  <div
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    Il n'y a pas de relation pour cette chaussure actuellement
                  </div>
                )}
                {relations.length > 0 && (
                  <div
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {relations && relations.length > 0 && (
                      <ProductListDash
                        shoes={relations as Shoes[]}
                        remove={handleRemove}
                      ></ProductListDash>
                    )}
                  </div>
                )}
              </Fragment>
            </GeneralForm>
          )}
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
export default memo(ShoesForm);
