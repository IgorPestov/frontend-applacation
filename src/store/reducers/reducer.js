let initialState = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    aboutYourself: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_POST":
      const {
        _id,
        firstName,
        lastName,
        age,
        gender,
        aboutYourself,
      } = action.payload;
      return {
        user: {
          id: _id,
          firstName,
          lastName,
          age,
          gender,
          aboutYourself,
        },
      };
    case "EDIT_FIRST_NAME":
      return {
        ...state.user,
        user: { ...state.user, firstName: action.payload },
      };
    case "EDIT_LAST_NAME":
      return {
        ...state.user,
        user: { ...state.user, lastName: action.payload },
      };
    case "EDIT_AGE":
      return {
        ...state.user,
        user: { ...state.user, age: action.payload },
      };
    case "EDIT_GENDER":
      return {
        ...state.user,
        user: { ...state.user, gender: action.payload },
      };
    case "EDIT_ABOUT_YOURSELF":
      return {
        ...state.user,
        user: { ...state.user, aboutYourself: action.payload },
      };
    default:
      return state;
  }
};
export default reducer;
