import axios from "axios";

const API_URL = "http://localhost:3000/user/";

async function signUpUser(firstName, email, password) {
  const { data: newUser } = await axios.post(API_URL + "signUp", {
    firstName,
    email,
    password,
  });
  return newUser;
}

async function signInUser(email, password) { 
  const { data: user } = await axios.post(API_URL + `${"signIn"}`, {
    email,
    password,
  });
  return user;
}
async function showUserInfo(id, ) {
    const {data: user} = await axios.get(API_URL +`${"showUserInfo"}`+ `${id}`)
    return user;
}   
async function updateUserInfo(id, payload) { 
    const {data: newUser} = await axios.put(API_URL+`${"updateUserInfo"}` + `${id}`, payload)
    return newUser;
}
async function showFiles(id) {
    const { data : files} = await axios.get(API_URL+`${"showFiles"}`+ `${id}`)
    return files
}
async function putUnloadFile(id, payload) {
    const {data : newFile} = await axios.put(API_URL + `${"uploadFile"}`+ `${id}`, payload)
    return newFile
}
async function getDownloadFile(id) {
    const {data: files} = await axios.get(API_URL +`${id}`)
    return files
}
export default {
  signInUser,
  signUpUser,
  showUserInfo,
  updateUserInfo,
  showFiles,
  putUnloadFile,
  getDownloadFile,
};
