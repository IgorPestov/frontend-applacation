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
import { makeStyles } from "@material-ui/core/styles";
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
  const classes = useStyles();
  const File = () => {
    props.history.push("/uploadFile");
  };
  const Profile = () => {
    props.history.push("/profile");
  };

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
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
              <Divider />
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
              <Divider />
            </div>
          </List>
        </Drawer>
      </Hidden>
    </nav>
  );
};
export default Panel;
