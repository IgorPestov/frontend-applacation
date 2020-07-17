import React, { useEffect, useState } from "react";
import {
  IconButton,
  Container,
  Grid,
  Paper,
  Avatar,
  TextField,
  Typography,
  NativeSelect,
  FormControl,
} from "@material-ui/core";
import { AddAPhoto, Save } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import APIHelper from "../../APIHelper";
import jwtDecode from "jwt-decode";
import actions from "../../store/action/action";
import { HeaderProfile } from "../header";
import Panel from "../panel";
import { Alert } from "@material-ui/lab";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  grid: { margin: theme.spacing(2) },

  PaperInfoBlock: {
    backgroundColor: "#d7ccc8",
    marginTop: 3,
    minWidth: "100%",
  },
  paper: {
    elevation: 0,
    minHeight: "100%",
    fontWeight: 600,
    fontStyle: "italic",
    fontFamily: "Monospace",
    fontSize: 16,
  },
  paperStaticInfo: {
    minHeight: "100%",
    textAlign: "right",
    letterSpacing: 5,
  },
  PaperInfoBlockAvatar: {
    backgroundColor: "#d7ccc8",
    padding: theme.spacing(1),
    minWidth: 150,
    minHeight: 200,
    paddingBottom: 0,
  },
  paperStaticInfoYourself: {
    minHeight: "100%",
    letterSpacing: 5,
  },
  PaperInfoBlockYourSelf: {
    backgroundColor: "#d7ccc8",

    padding: theme.spacing(1),
    marginTop: 3,
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
    variant: "contained",
  },
  edit: {
    flexGrow: 1,
  },
}));

const UpdateUserInfo = (props) => {
  const [file, setFile] = useState(null);
  const [check, setCheck] = useState(false);
  const [err, setErr] = useState(null);
  const [errOld, setErrOld] = useState(null);
  const {
    firstName,
    lastName,
    age,
    gender,
    id,
    aboutYourself,
    avatar,
  } = useSelector((state) => state.user);
  const regAge = /^\d{0,}$/;
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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

  const postUserAvatar = async (id, payload) => {
    const avatar = await APIHelper.postUserAvatar(id, payload);
    if (avatar) {
      setCheck(false);
      dispatch(actions.saveAvatar(avatar));
    }
  };
  const updateUserInfo = async (id, payload) => {
    const newUserInfo = await APIHelper.updateUserInfo(id, payload);
    if (newUserInfo) {
      if (props.history.location.pathname === "/updateUserInfo") {
        props.history.push("/profile");
      }
    }
  };
  const EditInfo = async (e) => {
    e.preventDefault();
    updateUserInfo(id, user);
  };

  if (file) {
    setCheck(true);
    const data = new FormData();
    data.append("file", file);
    postUserAvatar(id, data);
    setFile(null);
  }
  const handleChangeAge = (event) => {
    console.log(event.target.value);
    if (!regAge.test(event.target.value)) {
      return setErr("Only nambers");
    }
    if (event.target.value > 120) {
      return setErrOld("Realy, so old?");
    }
    if (event.target.value <= 0) {
      dispatch(actions.editAge(null));
    }
    setErrOld(null);
    setErr(null);
    return dispatch(actions.editAge(event.target.value));
  };
  const handleChange = (event) => {
    dispatch(actions.editGender(event.target.value));
  };
  const Alerts = () => {
    if (err || errOld) {
      return <Alert severity="error">{err || errOld}</Alert>;
    }
    return null;
  };
  return (
    <div className={classes.root}>
      <HeaderProfile history={props.history} />
      <Panel history={props.history} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container className={classes.root}>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item container xs={12}>
              <Grid item xs={12} sm={4} lg={2}>
                <Paper className={classes.PaperInfoBlockAvatar}>
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
                      disabled={check}
                      onClick={EditInfo}
                    />
                    <label htmlFor="icon-button-edit">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        disabled={check}
                      >
                        <Save />
                      </IconButton>
                    </label>
                  </form>
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
                        <TextField
                          value={firstName}
                          onChange={({ target }) =>
                            dispatch(actions.editFirstName(target.value))
                          }
                        />
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
                        <TextField
                          value={lastName}
                          onChange={({ target }) =>
                            dispatch(actions.editLastName(target.value))
                          }
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <Paper className={classes.PaperInfoBlock}>
                  <Alerts />
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
                        <TextField
                          onChange={handleChangeAge}
                          value={age}
                          // onChange={({ target }) =>
                          //   dispatch(actions.editAge(target.value))
                          // }
                        />
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
                        <FormControl className={classes.formControl}>
                          <NativeSelect
                            value={gender}
                            onChange={handleChange}
                            name="gender"
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "gender" }}
                          >
                            <option value="">None</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Famale"}>Famale</option>
                          </NativeSelect>
                        </FormControl>
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.PaperInfoBlockYourSelf}>
                <Typography
                  component={"span"}
                  className={classes.paperStaticInfo}
                >
                  About yourself:
                </Typography>
                <Typography
                  component={"span"}
                  className={classes.paperStaticInfoYourself}
                >
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
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default UpdateUserInfo;
