const userPost = (newUser) => {
    return {
        type: "USER_POST",
        payload: newUser
    }
}
export {
    userPost
};