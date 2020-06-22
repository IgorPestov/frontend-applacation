const tokenAccess = (newTokenAccess) => {
    return {
        type: "ACCESS_TOKEN_POST",
        payload: newTokenAccess
    }
}   
const userPost = (newUser) => {
    return{
        type: "USER_POST",
        payload: newUser
    }
}
export {
    tokenAccess,
    userPost,
    
};