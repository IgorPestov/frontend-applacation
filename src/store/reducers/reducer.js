
const initialState = {
    user : {}
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "USER_POST":
           return {
               user: action.payload
           }
    
        default:
            return state;
    }
    
};
export default reducer;