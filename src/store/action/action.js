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
export default {
  userPost,
  editFirstName,
  editLastName,
  editAge,
  editGender,
  editAboitYourself,
};
