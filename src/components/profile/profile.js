import React, { useEffect } from "react";
import {
  IconButton,
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import APIHelper from "../../APIHelper";
import jwtDecode from "jwt-decode";
import actions from "../../store/action/action";
import Panel from "../panel";
import { HeaderProfile } from "../header/index";

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  grid: {
    pading: theme.spacing(1),
  },
  PaperInfoBlock: {
    backgroundColor: '#d7ccc8',
    marginTop: 3,
    width: "100%",
  },
  paper: {
    elevation: 0,
    minHeight: "100%",
    fontWeight: 200,
    fontStyle: "italic",
    fontFamily: "Monospace",
    fontSize: 16,
    wordBreak: "break-all",
  },
  paperStaticInfo: {
    minHeight: "100%",
    textAlign: "right",
    letterSpacing: 5,
    display: "block",
  },
  paperStaticInfoYourself: {
    minHeight: "100%",

    letterSpacing: 5,
  },
  PaperInfoBlockAll: {
    backgroundColor: '#d7ccc8',
    padding: theme.spacing(1),
    paddingBottom: 0,
    marginRight: 3,
  },
  PaperInfoBlockYourSelf: {
    backgroundColor: '#d7ccc8',
    padding: theme.spacing(1),
    marginTop: 3,
    marginRight: 3,
    minHeight: 100,
    minWidth: "100%",
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
    padding: theme.spacing(1),
  },
  large: {
    borderRadius: "5%",
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  input: {
    display: "none",
  },
  edit: {
    flexGrow: 1,
  },
  gridInfo: {
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
          <Grid container direction="row" spacing={3} className={classes.grid}>
            <Grid item container xs={12} spacing={3}>
              <Grid item xs={12} sm={4} lg={2}>
                <Paper className={classes.PaperInfoBlockAll}>
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
                item
                container
                alignItems="center"
                xs={12}
                sm={8}
                lg={10}
                className={classes.gridInfoUser}
              >
                <Paper className={classes.PaperInfoBlock}>
                  <Grid item container xs={12}>
                    <Grid item xs={5}>
                      <Typography
                        component={"span"}
                        className={classes.paperStaticInfo}
                      >
                        First name:
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography component={"span"} className={classes.paper}>
                        {firstName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <Paper className={classes.PaperInfoBlock}>
                  <Grid item container xs={12}>
                    <Grid item xs={5}>
                      <Typography
                        component={"span"}
                        className={classes.paperStaticInfo}
                      >
                        Last name:
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography component={"span"} className={classes.paper}>
                        {lastName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <Paper className={classes.PaperInfoBlock}>
                  <Grid item container xs={12}>
                    <Grid item xs={5}>
                      <Typography
                        component={"span"}
                        className={classes.paperStaticInfo}
                      >
                        Age:
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography component={"span"} className={classes.paper}>
                        {age}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <Paper className={classes.PaperInfoBlock}>
                  <Grid item container xs={12}>
                    <Grid item xs={5}>
                      <Typography
                        component={"span"}
                        className={classes.paperStaticInfo}
                      >
                        Gender:
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography component={"span"} className={classes.paper}>
                        {gender}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Paper className={classes.PaperInfoBlockYourSelf}>
                <Typography
                  component={"span"}
                  className={classes.paperStaticInfoYourself}
                >
                  About yourself:
                </Typography>
                <Typography paragraph className={classes.paper}>
                  {aboutYourself}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Profile;
