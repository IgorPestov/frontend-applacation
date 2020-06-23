let initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_POST":
      return {
        ...action.payload,
      };
    case "EDIT_FIRST_NAME":
      return {
        ...state,
        firstName: action.payload,
      };
    case "EDIT_LAST_NAME":
      return {
        ...state,
        lastName: action.payload,
      };
    case "EDIT_AGE":
      return {
        ...state,
        age: action.payload,
      };
    case "EDIT_GENDER":
      return {
        ...state,
        gender: action.payload,
      };
    case "EDIT_ABOUT_YOURSELF":
      return {
        ...state,
        aboutYourself: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
