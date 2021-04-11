import { UpdateFilterAction, FilterList, ValueProps } from "../types/filter";

export const filterReducer = (
  initialValues: FilterList,
  action: UpdateFilterAction
): FilterList => {
  switch (action.type) {
    case "updateBox": {
      const state = (initialValues as any)[action.field as string];
      const newState = Object.keys(state).reduce((acc, item) => {
        acc[item] = action.key === item && !state[action.key] ? true : false;
        return acc;
      }, {} as Record<keyof ValueProps, boolean>);
      return { ...initialValues, [action.field as string]: newState };
    }
    case "updateList":
      const state = (initialValues as any)[action.field as string];

      const newState = state.map((item: any) => {
        const isUpdate =
          action.value === item.size || action.value === item.hex;
        return {
          ...item,
          checked: isUpdate ? (item.checked ? false : true) : item.checked,
        };
      });
      return { ...initialValues, [action.field as string]: newState };
    case "reset":
      return { ...action.values };
    default:
      return initialValues;
  }
};
