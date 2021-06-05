import { Tab, TabProps, Tabs, withStyles } from "@material-ui/core";

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

export const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingTop: 0,
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#b06873",
    },
  },
})((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="here" /> }}
  />
));

export const StyledTab = withStyles((theme) => ({
  root: {
    justifyContent: "center",
    textTransform: "none",
    // color: "inherit",
    color: "black",
    fontSize: "1.2rem",
    "&:focus": {
      opacity: 1,
    },
    minWidth: "auto",
  },
}))((props: TabProps) => <Tab disableRipple {...props} />);
