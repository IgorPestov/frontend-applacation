const userPost = (newUser) => {
  return {
    type: "USER_POST",
    payload: newUser,
  };
};
const editFirstName = (firstName) => {
  return {
    type: "EDIT_FIRST_NAME",
    payload: firstName,
  };
};
const editLastName = (lastName) => {
  return {
    type: "EDIT_LAST_NAME",
    payload: lastName,
  };
};
const editAge = (age) => {
  return {
    type: "EDIT_AGE",
    payload: age,
  };
};
const editGender = (gender) => {
  return {
    type: "EDIT_GENDER",
    payload: gender,
  };
};
const editAboitYourself = (aboutYorself) => {
  return {
    type: "EDIT_ABOUT_YOURSELF",
    payload: aboutYorself,
  };
};
const saveAvatar = (avatar) => {
  return {
    type: "SAVE_AVATAR",
    payload: avatar,
  };
};
const addFileInfo = (file) => {
  return {
    type: "ADD_FILE_INFO",
    payload: file,
  };
};
const resetLink = (link) => {
  return {
    type: "RESET_LINK",
    payload: link,
  };
};
export default {
  userPost,
  editFirstName,
  editLastName,
  editAge,
  editGender,
  editAboitYourself,
  saveAvatar,
  addFileInfo,
  resetLink,
};
