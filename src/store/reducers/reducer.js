const initialState = {
  accessToken: {},
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACCESS_TOKEN_POST":
      return {
        accessToken: action.payload,
      };
      case "USER_POST": 
      return {
        user: action.payload,
      }
    default:
      return state;
  }
};
export default reducer;