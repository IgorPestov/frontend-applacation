const initialState = {
  accessToken: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACCESS_TOKEN_POST":
      return {
        accessToken: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;