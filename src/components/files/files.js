import React, { useState, useEffect } from "react";
import {
  IconButton,
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import { CreateNewFolder, Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import APIHelper from "../../APIHelper";
import jwtDecode from "jwt-decode";
import actions from "../../store/action/action";
import Panel from "../panel";
import { HeaderFiles } from "../header/index";

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
  paperFiles: {
    padding: theme.spacing(1),
    marginTop: 3,
    maxWidth: "auto",
  },
  image: {
    width: 70,
    height: 70,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));
const Files = (props) => {
  const token = JSON.parse(localStorage.getItem("tokenData")).accessToken;
  const userAccessToken = jwtDecode(token);
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const classes = useStyles();
  const { avatar, id } = useSelector((state) => state.user);

  const refreshToken = async (refreshToken) => {
    const tokens = await APIHelper.refreshToken(refreshToken);
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
    dispatch(actions.userPost(user));
  };
  const saveFile = async (e) => {
    e.preventDefault();
    console.log(file);

    if (file) {
      

      const data = new FormData();
      data.append("file", file);
      postUnloadFile(id, data);
    }
  };

  const postUnloadFile = async (id, payload) => {
    await APIHelper.postUnloadFile(id, payload);
  };

  return (
    <div className={classes.root}>
      <HeaderFiles history={props.history} />
      <Panel history={props.history} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container className={classes.root}>
          <Grid container className={classes.grid}>
            <Grid container spacing={1}>
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
                    className={classes.input}
                    id="icon-button-edit"
                    type="file"
                    onChange={({ target }) => {
                      setFile(target.files[0])
                      // setUserFile(target.files[0].name, target.files[0].size, target.files[0].type)
                    }}
                  />
                  <label htmlFor="icon-button-edit">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <CreateNewFolder />
                    </IconButton>
                  </label>
                  <input
                    className={classes.input}
                    id="icon-button-add"
                    type="button"
                    onClick={saveFile}

                  />
                  <label htmlFor="icon-button-add">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <Add />
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
                
                <Paper className={classes.paperFiles}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase className={classes.image}>
                        <img
                          className={classes.img}
                          alt="complex"
                          src="/static/images/grid/complex.jpg"
                        />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        Name:
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Size:
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Type:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ cursor: "pointer" }}>
                        Download
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};
export default Files;
