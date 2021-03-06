import {SET_CURRENT_USER,SET_CURRENT_USER_OFF} from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action)
{
    switch(action.type)
    {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case SET_CURRENT_USER_OFF:
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            }
        default:
            return state;
    }
}