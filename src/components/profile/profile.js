import React, { useState, useEffect } from "react";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Avatar,
  Button,
} from "@material-ui/core";
import { Edit, Menu, Person, AddToPhotos, Folder } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import APIHelper from "../../APIHelper";
import jwtDecode from "jwt-decode";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  grid: { margin: theme.spacing(2) },
  paper: {
    padding: theme.spacing(1),
    marginTop: 1,
    maxWidht: 500,
  },
  paper1: {
    padding: theme.spacing(1),
    marginBottom: 3,
  },
  paper2: {
    padding: theme.spacing(1),
    marginTop: 3,
    maxWidht: 500,
    minHeight: 200,
  },
  title: {
    flexGrow: 1,
  },
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
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
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  input: {
    display: "none",
  },
  edit: {
    flexGrow: 1,
  },
}));

const Profile = (props) => {
  const { accessToken } = props;
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [user, setUser] = useState([]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const token = JSON.parse(localStorage.getItem("tokenData")).accessToken;
  const userAccessToken = jwtDecode(token);
  const refreshToken = async (refreshToken) => {
    const tokens = await APIHelper.refreshToken(refreshToken);
    props.tokenAccess(tokens.accessToken);
    return localStorage.setItem("tokenData", JSON.stringify(tokens));
  };
  useEffect(() => {
    if (Date.now() >= userAccessToken.exp * 1000) {
      refreshToken(JSON.parse(localStorage.getItem("tokenData")).refreshToken);
    }
    showUserInfo(userAccessToken.userId);
  }, []);
  const showUserInfo = async (userId) => {
    const user = await APIHelper.showUserInfo(userId);
    setUser(user);
  };
  const logOut = () => {
    localStorage.setItem("logged", false);
    if (!localStorage.setItem("logged", false)) {
      props.history.push("/signIn");
      localStorage.clear("tokenData");
    }
  };
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["File", "Profile"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Folder /> : <Person />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

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
          <Typography variant="h6" className={classes.title} noWrap>
            Profile
          </Typography>
          <Button color="inherit" onClick={logOut}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
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
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
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
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container className={classes.root}>
          <Grid container className={classes.grid}>
            <Grid container>
              <Grid item xs={12}>
                <Paper className={classes.paper1}>
                  Avatar
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    className={classes.large}
                  />
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-foto"
                    type="button"
                  />
                  <label className={classes.edit} htmlFor="icon-button-foto">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <AddToPhotos />
                    </IconButton>
                  </label>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-edit"
                    type="button"
                  />
                  <label htmlFor="icon-button-edit">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <Edit />
                    </IconButton>
                  </label>
                </Paper>
              </Grid>
              <Grid
                container
                alignItems="stretch"
                direction="column"
                item
                xs={12}
              >
                <Grid>
                  <Paper className={classes.paper}>{user.firstName}</Paper>
                </Grid>
                <Grid>
                  <Paper className={classes.paper}>{user.lastName}</Paper>
                </Grid>
                <Grid>
                  <Paper className={classes.paper}>{user.age}</Paper>
                </Grid>
                <Grid>
                  <Paper className={classes.paper}>{user.gender}</Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper2}>{user.aboutYourself}</Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};
const mapStateToProps = ({ accessToken }) => {
  return { accessToken };
};
const mapDispatchToProps = (dispatch) => {
  return {
    tokenAccess: (newTokens) => {
      dispatch({
        type: "ACCESS_TOKEN_POST",
        payload: newTokens,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
