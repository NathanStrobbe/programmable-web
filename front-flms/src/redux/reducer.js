const user = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.playload,
                loggedIn: true
            };
        case "LOGOUT":
            return{
                ...state,
                user: {},
                loggedIn: false
            };
        default:
            return {
                ...state,
                user: sessionStorage.getItem('jwtToken'),
                loggedIn: !!sessionStorage.getItem('jwtToken')
            };
    }
};

export default user;
