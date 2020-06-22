const tokenAccess = (newTokenAccess) => {
    return {
        type: "ACCESS_TOKEN_POST",
        payload: newTokenAccess
    }
}
export {
    tokenAccess,
    
};