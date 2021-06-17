import { memo } from "react";
import { sideBarMenu } from "../../constants/constants";
import List from "@material-ui/core/List";
import { MenuItem, MenuSubItem } from "./MenuItem/MenuItem";

interface MenuMaterialProps {}

interface Isub {
  title: string;
  path: string;
  icon: any;
}

const MenuMaterial: React.FC<MenuMaterialProps> = () => {
  const menuList = sideBarMenu.map((item, index) => {
    return item.sub.length === 0 ? (
      <MenuItem
        key={index}
        title={item.title}
        path={item.path}
        Icon={item.icon}
      />
    ) : (
      <MenuSubItem
        key={index}
        title={item.title}
        sub={item.sub as Isub[]}
        Icon={item.icon}
      />
    );
  });

  return <List>{menuList}</List>;
};
export default memo(MenuMaterial);
