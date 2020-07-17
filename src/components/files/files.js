import React, { useState, useEffect } from "react";
import {
  IconButton,
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  Button,
  LinearProgress,
} from "@material-ui/core";
import {
  CreateNewFolder,
  CloudUpload,
  Delete,
  Save,
  Description,
} from "@material-ui/icons";
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

  paper1: {
    backgroundColor: "#d7ccc8",
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
    borderRadius: "5%",
    width: theme.spacing(15),
    height: theme.spacing(15),
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
  paperFiles: {
    backgroundColor: "#d7ccc8",
    padding: theme.spacing(1),
    marginTop: 3,
    maxWidth: "auto",
  },
  image: {
    width: 70,
    height: 100,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  button: {
    display: "colums",
    color: "#4e342e",
    margin: theme.spacing(1),
  },
  buttonSave: {
    display: "none",
    margin: theme.spacing(1),
  },
  buttonSaveActive: {
    display: "colums",
    margin: theme.spacing(1),
  },
  buttonGrid: {
    direction: "column",
    alignItems: "flex-end",
  },
  CheckFiles: {
    backgroundColor: "#d7ccc8",
    elevation: 0,
    minHeight: "100%",
    textAlign: "center",
    letterSpacing: 5,
    m: 1,
  },
}));
const Files = (props) => {
  const [check, setCheck] = useState(false);
  const token = JSON.parse(localStorage.getItem("tokenData")).accessToken;
  const userAccessToken = jwtDecode(token);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [save, setSave] = useState(false);
  const [load, setLoad] = useState("Files is empty");
  const classes = useStyles();

  const { avatar, id, files } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state);
  const refreshToken = async (refreshToken) => {
    try {
      const tokens = await APIHelper.refreshToken(refreshToken);
      return localStorage.setItem("tokenData", JSON.stringify(tokens));
    } catch (err) {
      props.history.push("/signIn");
      localStorage.clear("tokenData");
    }
  };
  useEffect(() => {
    if (Date.now() >= userAccessToken.exp * 1000) {
      refreshToken(JSON.parse(localStorage.getItem("tokenData")).refreshToken);
    }
    showUserInfo(userAccessToken.userId);
  }, []);
  const postUnloadFile = async (id, payload) => {
    const filesUser = await APIHelper.postUnloadFile(id, payload);
    if (filesUser) {
      setLoad("Click save");
      setCheck(false);
    }
  };

  const deleteFile = async (id, paylod) => {
    const filesUser = await APIHelper.deleteFile(id, paylod);
    if (filesUser) {
      dispatch(actions.userPost(filesUser));
    }
  };
  const delFile = (e) => {
    e.preventDefault();
    const idFile = e.currentTarget.id;
    const path = e.currentTarget.value;
    const data = new FormData();
    data.append("idFile", idFile);
    data.append("path", path);

    deleteFile(id, data);
  };
  const showUserInfo = async (id) => {
    const user = await APIHelper.showUserInfo(id);
    dispatch(actions.userPost(user));
  };
  const saveFile = (e) => {
    e.preventDefault();
    setLoad("Files is empty");
    showUserInfo(id, user);
    setSave(false);
  };
  if (file) {
    setCheck(true);
    setSave(true);
    setLoad("File upload");
    const data = new FormData();
    data.append("file", file);
    postUnloadFile(id, data);
    setFile(null);
  }
  const FilesUser = () => {
    return (
      <Container>
        {load === "File upload" || load === "Click save" ? (
          <Paper>
            <Typography
              className={classes.CheckFiles}
              gutterBottom
              variant="subtitle1"
            >
              {load === "File upload" ? <LinearProgress /> : load}
            </Typography>
          </Paper>
        ) : (
          <Paper>
            <Typography
              className={classes.CheckFiles}
              gutterBottom
              variant="subtitle1"
            >
              {files.length <= 0 ? load : false}
            </Typography>
          </Paper>
        )}

        {files.map((file) => {
          const { name, size, mimetype, _id, urlImg, url, filePath } = file;

          const i = Math.floor(Math.log(size) / Math.log(1024)),
            sizes = ["bytes", "kB", "MB", "GB"];

          const Size =
            (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + sizes[i];

          return (
            <Paper key={_id} className={classes.paperFiles}>
              <Grid container spacing={2}>
                <Grid item>
                  {mimetype === "image/png" || "image/jpeg" ? (
                    <Avatar src={urlImg}></Avatar>
                  ) : (
                    <Avatar>
                      <Description />
                    </Avatar>
                  )}
                </Grid>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    Name: {name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Size: {Size}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Type: {mimetype}
                  </Typography>
                </Grid>
                <Grid item className={classes.buttonGrid}>
                  <Grid>
                    <Button
                      size="small"
                      variant="contained"
                      color="default"
                      href={url}
                      className={classes.button}
                      startIcon={<CloudUpload />}
                    >
                      Download
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      id={_id}
                      size="small"
                      variant="contained"
                      value={filePath}
                      className={classes.button}
                      startIcon={<Delete />}
                      onClick={delFile}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </Container>
    );
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
                    onChange={({ target }) => setFile(target.files[0])}
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
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={
                      save ? classes.buttonSaveActive : classes.buttonSave
                    }
                    startIcon={<Save />}
                    disabled={check}
                    onClick={saveFile}
                  >
                    Save
                  </Button>
                </Paper>
              </Grid>
              <Grid
                container
                alignItems="stretch"
                direction="column"
                item
                xs={12}
              >
                <FilesUser />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};
export default Files;
