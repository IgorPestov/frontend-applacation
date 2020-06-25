import axios from "axios";

const API_URL = "http://localhost:3000/user/";

async function signUpUser(email, password, firstName) {
  const { data: newUser } = await axios.post(API_URL + `${"signUp"}`, {
    email,
    firstName,
    password,
  });
  return newUser;
}

async function signInUser(email, password, id) {
  const { data: user } = await axios.post(API_URL + `${"signIn"}`, {
    email,
    password,
    id,
  });
  return user;
}
async function showUserInfo(id) {
  const { data: user } = await axios.get(
    API_URL + `${"showUserInfo/"}` + `${id}`
  );
  return user;
}
async function updateUserInfo(id, payload) {
  const { data: newUser } = await axios.put(
    API_URL + `${"updateUserInfo/"}` + `${id}`,
    payload
  );
  return newUser;
}
async function showFiles(id) {
  const { data: files } = await axios.get(API_URL + `${"showFiles"}` + `${id}`);
  return files;
}
async function postUnloadFile(id, payload) {
  const { data: newFile } = await axios.post(
    API_URL + `${"uploadFile/"}` + `${id}`,
    payload
  );
  return newFile;
}
async function getDownloadFile(id) {
  const { data: files } = await axios.get(API_URL + `${id}`);
  return files;
}

///////////////////////////////////////////////////////////////////////////////////////////
async function refreshToken(refreshToken) {
  const URL = "http://localhost:3000/user/refresh-tokens";

  const { data: token } = await axios.post(URL, { refreshToken });

  return token;
}
/////////////////////////////////////////////////////////////////////////////////////////

export default {
  signUpUser,
  signInUser,
  showUserInfo,
  updateUserInfo,
  showFiles,
  postUnloadFile,
  getDownloadFile,
  refreshToken,
};
