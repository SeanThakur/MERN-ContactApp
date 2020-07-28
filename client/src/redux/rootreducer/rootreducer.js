import {combineReducers} from "redux";
import authreducer from "../reducer/authreducer";
import errorreducer from "../reducer/errorreducer";
import contactreducer from "../reducer/contactreducer";

export default combineReducers({
    auth: authreducer,
    errors: errorreducer,
    contact: contactreducer
});