import React, { useEffect } from "react";
import {
  IconButton,
  Container,
  Grid,
  Paper,
  Avatar,
  TextField,
} from "@material-ui/core";
import { AddAPhoto, Save } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import APIHelper from "../../APIHelper";
import jwtDecode from "jwt-decode";
import actions from "../../store/action/action";
import { HeaderProfile } from "../header";
import Panel from "../panel";


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

const UpdateUserInfo = (props) => {
  useEffect(() => {
    if (Date.now() >= userAccessToken.exp * 1000) {
      refreshToken(JSON.parse(localStorage.getItem("tokenData")).refreshToken);
    }
    showUserInfo(userAccessToken.userId);
  }, []);
  const token = JSON.parse(localStorage.getItem("tokenData")).accessToken;
  const userAccessToken = jwtDecode(token);
  const refreshToken = async (refreshToken) => {
    const tokens = await APIHelper.refreshToken(refreshToken);
    return localStorage.setItem("tokenData", JSON.stringify(tokens));
  };

  const showUserInfo = async (userId) => {
    const user = await APIHelper.showUserInfo(userId);
    dispatch(actions.userPost(user));
  };

  const { firstName, lastName, age, gender, id, aboutYourself } = useSelector(
    (state) => state.user
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const updateUserInfo = async (id, payload) => {
    await APIHelper.updateUserInfo(id, payload);
  };
  const EditInfo = () => {
    updateUserInfo(id, user);
    if (props.history.location.pathname === "/updateUserInfo") {
      dispatch(actions.editFirstName(firstName));
      props.history.push("/profile");
    }
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
                      <AddAPhoto />
                    </IconButton>
                  </label>
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
                      <Save />
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
                    First name:
                    <TextField
                      value={firstName}
                      onChange={({ target }) =>
                        dispatch(actions.editFirstName(target.value))
                      }
                    />
                  </Paper>
                </Grid>
                <Grid>
                  <Paper className={classes.paper}>
                    Last name:
                    <TextField
                      value={lastName}
                      onChange={({ target }) =>
                        dispatch(actions.editLastName(target.value))
                      }
                    />
                  </Paper>
                </Grid>
                <Grid>
                  <Paper className={classes.paper}>
                    Age:
                    <TextField
                      value={age}
                      onChange={({ target }) =>
                        dispatch(actions.editAge(target.value))
                      }
                    />
                  </Paper>
                </Grid>
                <Grid>
                  <Paper className={classes.paper}>
                    Gender:
                    <TextField
                      value={gender}
                      onChange={({ target }) =>
                        dispatch(actions.editGender(target.value))
                      }
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                About yourself:
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  fullWidth
                  variant="outlined"
                  value={aboutYourself}
                  onChange={({ target }) =>
                    dispatch(actions.editAboitYourself(target.value))
                  }
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default UpdateUserInfo;
