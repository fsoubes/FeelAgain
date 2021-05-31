import { Color } from "./../types/filter";
import { UpdateFilterAction, FilterList, ValueProps } from "../types/filter";
import { heelsShoes, matShoes, paletteShoes } from "../constants/constants";

export const filterReducer = (
  initialValues: FilterList,
  action: UpdateFilterAction
): FilterList => {
  switch (action.type) {
    case "updateBox": {
      const state = (initialValues as any)[action.field as string];
      let variables = { ...initialValues["variables"] };
      const newState = Object.keys(state).reduce((acc, item) => {
        if (action.key === item) {
          if (action.field === "categories") {
            const prod = variables?.product === item ? undefined : item;
            variables = { ...variables, product: prod };
          } else {
            const index = variables?.tags?.indexOf(item);
            Object.keys(state)
              ?.filter((item) => state[item])
              .map((item) => {
                const curreIdx = variables?.tags?.indexOf(item);
                variables?.tags?.splice(curreIdx as number, 1);
              });
            index === -1
              ? variables?.tags?.push(item)
              : variables?.tags?.splice(index as number, 1);
          }
        }
        acc[item] = action.key === item && !state[action.key] ? true : false;
        return acc;
      }, {} as Record<keyof ValueProps, boolean>);

      return {
        ...initialValues,
        [action.field as string]: newState,
        variables: { ...variables },
      };
    }
    case "addTags": {
      const stateHeel = (initialValues as any)["heels" as string];
      const stateColor = (initialValues as any)["colors" as string];
      let stateMaterial = (initialValues as any)["materials" as string];

      const tag = decodeURIComponent(action.tags as string).split(",");

      const heel = (tag as string[]).filter(
        (item) => heelsShoes.indexOf(item) !== -1
      );

      const colors = (tag as string[]).filter(
        (item) => paletteShoes.indexOf(item) !== -1
      );

      const material = (tag as string[]).filter(
        (item) => matShoes.indexOf(item) !== -1
      );

      const updateColors = stateColor.map((item: Color) => {
        return {
          ...item,
          checked: colors.indexOf(item.color) !== -1 ? true : false,
        };
      });

      return {
        ...initialValues,
        ["colors"]: updateColors,
        ["materials"]: {
          ...stateMaterial,
          ...(material.length > 0 && { [material[0]]: true }),
        },
        ["heels"]: {
          ...stateHeel,
          ...(heel.length > 0 && { [`${heel}`]: true }),
        },
        variables: {
          ...initialValues["variables"],
          tags: tag,
        },
      };
    }

    case "updateList":
      const state = (initialValues as any)[action.field as string];
      const variables = { ...initialValues["variables"] };
      const newState = state.map((item: any, index: number) => {
        const isUpdate =
          action.value === item.size || action.value === item.hex;

        const isChecked = isUpdate
          ? item.checked
            ? false
            : true
          : item.checked;

        if (item.checked !== isChecked) {
          if (action.field === "sizes") {
            const index = variables?.size?.indexOf(item.size);
            index === -1
              ? variables?.size?.push(item.size)
              : variables?.size?.splice(index as number, 1);
          } else {
            const index = variables?.tags?.indexOf(item.color);
            index === -1
              ? variables?.tags?.push(item.color)
              : variables?.tags?.splice(index as number, 1);
          }
        }
        return {
          ...item,
          checked: isChecked,
          ...(state.length === index + 1 && { variables }),
        };
      });

      return {
        ...initialValues,
        [action.field as string]: newState,
        variables: {
          ...newState[newState.length - 1].variables,
        },
      };
    case "reset":
      return {
        ...action.values,
        variables: {
          product: undefined,
          size: [],
          tags: [],
        },
      };
    default:
      return initialValues;
  }
};
