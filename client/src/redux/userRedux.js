import { API_URL } from "../config";

//selector
export const getUser = (state => state.user);

//actions
const createActionName = actionName => `app/ads/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

//action creators
export const logIn = payload => ({
    type: LOG_IN,
    payload
});
export const logOut = payload => ({
    type: LOG_OUT
});


// thunk


const userReducer = (statePart = null, action) => {
    switch (action.type) {
        case LOG_IN:
            return action.payload;
        case LOG_OUT:
            return null;
        default:
            return statePart;
    }
};

export default userReducer;