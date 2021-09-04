import React, { useState } from "react";
import { Flex, useColorMode } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import {
  HamburgerIcon,
  InfoIcon,
  ViewIcon,
  SmallAddIcon,
  MoonIcon,
  SunIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import useStyles from "./headerStyles";

// Header bar for all pages of the website
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpenOrClose = () => {
    setOpen(!open);
  };

  return (
    <Flex>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpenOrClose}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <HamburgerIcon />
          </IconButton>
          <Typography style={{ justifyContent: "center" }} variant="h6">
            Willow
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button component={RouterLink} to="/">
            <ListItemIcon>
              <ViewIcon ml={1.5} />
            </ListItemIcon>
            <ListItemText primary={"Price History"} />
          </ListItem>

          <ListItem button component={RouterLink} to="/stocks">
            <ListItemIcon>
              <SmallAddIcon ml={1.5} />
            </ListItemIcon>
            <ListItemText primary={"Stock Info"} />
          </ListItem>

          <ListItem button component={RouterLink} to="/assistant">
            <ListItemIcon>
              <Search2Icon ml={1.5} />
            </ListItemIcon>
            <ListItemText primary={"Assistant"} />
          </ListItem>

          {/* Dark - Light mode */}
          <ListItem button onClick={() => toggleColorMode()}>
            <ListItemIcon>
              {colorMode === "light" ? (
                <SunIcon ml={1.5} />
              ) : (
                <MoonIcon ml={1.5} />
              )}
            </ListItemIcon>
            <ListItemText primary={"Change theme"} />
          </ListItem>

          <ListItem button component={RouterLink} to="/info">
            <ListItemIcon>
              <InfoIcon ml={1.5} />
            </ListItemIcon>
            <ListItemText primary={"Information"} />
          </ListItem>
        </List>
      </Drawer>
    </Flex>
  );
};

export default Header;
