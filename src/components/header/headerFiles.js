import React from "react";
import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Divider,
  Drawer,
  Hidden,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Person, Folder } from "@material-ui/icons";

const drawerWidth = 150;
const useStyles = makeStyles((theme) => ({
  grid: { margin: theme.spacing(2) },

  title: {
    flexGrow: 1,
  },
  root: {
    display: "flex",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));
const HeaderFiles = (props) => {
  const theme = useTheme();
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const File = () => {
    props.history.push("/uploadFile");
  };
  const Profile = () => {
    props.history.push("/profile");
  };

  const logOut = () => {
    localStorage.setItem("logged", false);
    if (!localStorage.setItem("logged", false)) {
      props.history.push("/signIn");
      localStorage.clear("tokenData");
    }
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
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
            </Drawer>
          </Hidden>
          <Typography variant="h6" className={classes.title} noWrap>
            FILE
          </Typography>
          <Button color="inherit" onClick={logOut}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default HeaderFiles;
