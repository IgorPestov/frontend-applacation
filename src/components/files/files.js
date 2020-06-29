import React, { useState } from "react";
import { IconButton, Container, Grid, Paper, Avatar } from "@material-ui/core";
import { CreateNewFolder , Add } from "@material-ui/icons";
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
const Files = (props) => {
  const [file, setFile] = useState("");
  const classes = useStyles();
  const { firstName, avatar, id } = useSelector((state) => state.user);
  // const option = {
  //   headers: "Content-Type': 'multipart/form-data"
  // }
  
  const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    
  });

  const saveFile  = async () => { 
    
    if(file) { 
      const data = new FormData();
      const base64File = await toBase64(file);
      data.append("file", base64File.replace(/.+,/, ""));
      postUnloadFile(id, data )
      console.log(data, file)
    }
  }
  const postUnloadFile = async (id, payload, ) => {
    await APIHelper.postUnloadFile(id, payload  )
 }
  
  return (
    <div className={classes.root}>
      <HeaderFiles history={props.history} />
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
                    src={`data:image/jpeg;base64,${avatar}`}
                    className={classes.large}
                  />
                  <input
                    className={classes.input}
                    id="icon-button-edit"
                    type="file"
                    onChange={({ target }) => {
                      setFile(target.files[0]);
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
                  />
                  <label htmlFor="icon-button-add">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={saveFile}
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
                <Grid>
                  <Paper className={classes.paper}>
                    First name: {firstName}
                  </Paper>
                </Grid>
                <Grid>
                  <Paper> </Paper>
                </Grid>
                <Grid>
                  <Paper></Paper>
                </Grid>
                <Grid>
                  <Paper></Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};
export default Files;
