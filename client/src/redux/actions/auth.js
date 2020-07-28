import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {GET_ERRORS,SET_CURRENT_USER,SET_CURRENT_USER_OFF} from "../actions/types";

export const getSignUP = (userData, history) => dispatch => {
    axios
          .post("/register", userData)
          .then(() => history.push("/login"))
          .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          }));
};

export const getLogin = (userData) => dispatch => {
    axios
        .post("/login", userData)
        .then((res) => {
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const setLogout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUserOff());
}

export const setCurrentUser = (decoded) => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const setCurrentUserOff = () => {
    return{
        type: SET_CURRENT_USER_OFF
    }
}
