import React from "react";
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Person, Folder } from "@material-ui/icons";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));
const Panel = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const File = () => {};
  const Profile = () => {};

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div>
            <div className={classes.toolbar} />
            <ListItem button key={"Profile"} onClick={Profile}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
            <ListItem button key={"File"} onClick={File}>
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary={"File"} />
            </ListItem>
          </div>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <Divider />
          <List>
            <div>
              <div className={classes.toolbar} />
              <ListItem button key={"Profile"} onClick={Profile}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
              </ListItem>
              <ListItem button key={"File"} onClick={File}>
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary={"File"} />
              </ListItem>
            </div>
          </List>
          <Divider />
        </Drawer>
      </Hidden>
    </nav>
  );
};
export default Panel;
