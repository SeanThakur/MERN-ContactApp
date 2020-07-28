import {CONTACT_LODING, GET_CONTACT,CLEAR_CURRENT_CONTACT,GET_CONTACTS} from "../actions/types";

const initialState = {
    isLoding : false,
    contact: null,
    contacts: null
}

export default function(state = initialState, action) {
    switch(action.type)
    {
        case CONTACT_LODING:
            return {
                ...state,
                isLoding: true
            }
        case GET_CONTACT:
            return {
                ...state,
                isLoding: false,
                contact: action.payload
            }
        case GET_CONTACTS:
            return {
                ...state,
                isLoding: false,
                contacts: action.payload
            }
        case CLEAR_CURRENT_CONTACT:
            return {
                ...state,
                contact: null
            }
        default:
            return state;
    }
}