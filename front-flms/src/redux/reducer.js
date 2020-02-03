const initialState={
    user: sessionStorage.getItem('jwtToken'),
    loggedIn: !!sessionStorage.getItem('jwtToken')
};

const user = (state = {initialState}, action) => {
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
            return state;
    }
};

export default user;
