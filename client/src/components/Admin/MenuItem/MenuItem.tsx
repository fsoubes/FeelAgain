import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Link from "next/link";

interface MenuItemProps {
  title: string;
  path: string;
  Icon: any;
}

interface Isub {
  title: string;
  path: string;
  icon: any;
}

interface MenuSubItemProps {
  title: string;
  Icon: any;
  sub: Isub[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export const MenuSubItem: React.FC<MenuSubItemProps> = ({
  title,
  sub,
  Icon,
}) => {
  const classes = useStyles();

  const [openSub, setSubOpen] = useState(false);

  const handleClick = () => {
    setSubOpen(!openSub);
  };
  return (
    <>
      <ListItem button key={title} onClick={handleClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={title} />
        {openSub ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <List>
        {sub.map(({ title, path, icon: Icon }, index) => (
          <Collapse key={index} in={openSub} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href={path}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        ))}
      </List>
    </>
  );
};

export const MenuItem: React.FC<MenuItemProps> = ({ title, path, Icon }) => {
  return (
    <Link href={path}>
      <ListItem button key={title}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </Link>
  );
};
