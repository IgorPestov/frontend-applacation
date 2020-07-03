import React, { useEffect, useState } from "react";
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
    variant: "contained",
  },
  edit: {
    flexGrow: 1,
  },
}));

const UpdateUserInfo = (props) => {
  const [file, setFile] = useState(null);
  const [check, setCheck] = useState(false)
  const {
    firstName,
    lastName,
    age,
    gender,
    id,
    aboutYourself,
    avatar,
  } = useSelector((state) => state.user);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (Date.now() >= userAccessToken.exp * 1000) {
      refreshToken(JSON.parse(localStorage.getItem("tokenData")).refreshToken);
    }
    showUserInfo(userAccessToken.userId);
  }, [dispatch]);
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



  const postUserAvatar = async (id, payload) => {
    await APIHelper.postUserAvatar(id, payload);
  };
  const updateUserInfo = async (id, payload) => {
    await APIHelper.updateUserInfo(id, payload);
  };

  const EditInfo = async (e) => {
    e.preventDefault();

    updateUserInfo(id, user);
    setTimeout(() => {
      if (props.history.location.pathname === "/updateUserInfo") {
        props.history.push("/profile");
      }
    }, 2000);
  };

  if (file) {
    setCheck(true)
    const data = new FormData();
    data.append("file", file);
    postUserAvatar(id, data);
    dispatch(actions.saveAvatar(file.name))

    setTimeout(() => {
      dispatch(actions.saveAvatar(file.name))


      setCheck(false);
    }, 2000);
    setFile(null);
  }

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
                  <form id="editUser">
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-foto"
                      type="file"
                      onChange={({ target }) => {
                        setFile(target.files[0]);
                      }}
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
                        disabled = {check}
                      >
                        <Save />
                      </IconButton>
                    </label>
                  </form>
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
                  placeholder="text here"
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
