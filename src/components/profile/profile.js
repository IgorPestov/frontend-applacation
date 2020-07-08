import React, { useEffect } from "react";
import { IconButton, Container, Grid, Paper, Avatar } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import APIHelper from "../../APIHelper";
import jwtDecode from "jwt-decode";
import actions from "../../store/action/action";
import Panel from "../panel";
import { HeaderProfile } from "../header/index";

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
    minHeight: 100,
  },

  root: {
    display: "flex",
  },
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
  const classes = useStyles();
  const {
    firstName,
    lastName,
    age,
    aboutYourself,
    gender,
    avatar,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (Date.now() >= userAccessToken.exp * 1000) {
      refreshToken(JSON.parse(localStorage.getItem("tokenData")).refreshToken);
    }
    showUserInfo(userAccessToken.userId);
  }, []);

  const token = JSON.parse(localStorage.getItem("tokenData")).accessToken;
  const userAccessToken = jwtDecode(token);
  const refreshToken = async (refreshToken) => {
    try {
      const tokens = await APIHelper.refreshToken(refreshToken);
      return localStorage.setItem("tokenData", JSON.stringify(tokens));
    } catch (err) {
      props.history.push("/signIn");
      localStorage.clear("tokenData");
    }
  };

  const showUserInfo = async (userId) => {
    const user = await APIHelper.showUserInfo(userId);
    dispatch(actions.userPost(user));
  };

  const EditInfo = () => {
    props.history.push("/updateUserInfo");
  };
  return (
    <div className={classes.root}>
      <HeaderProfile history={props.history} />
      <Panel history={props.history} />
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
                    src={avatar ? avatar.url : null}
                    className={classes.large}
                  />
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-edit"
                    type="button"
                    onClick={EditInfo}
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
                  <Paper className={classes.paper}>
                    First name: {firstName}
                  </Paper>
                </Grid>
                <Grid>
                  <Paper className={classes.paper}>Last name: {lastName}</Paper>
                </Grid>
                <Grid>
                  <Paper className={classes.paper}>Age: {age} </Paper>
                </Grid>
                <Grid>
                  <Paper className={classes.paper}>Gender: {gender}</Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                About yourself: {aboutYourself}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Profile;
