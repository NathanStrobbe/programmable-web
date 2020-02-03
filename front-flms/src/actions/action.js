const loginAction = (user) => ({
    type: 'LOGIN',
    payload: user,
});


const logoutAction = () => ({
    type: 'LOGOUT'
});


const allActions = {
    loginAction,
    logoutAction
};

export default allActions;
