import axios from "axios";
import {CONTACT_LODING, GET_CONTACT, CLEAR_CURRENT_CONTACT, GET_CONTACTS, GET_ERRORS} from "./types"

export const getCurrentContact = () => dispatch => {
    dispatch(contactLoding());
    axios
        .get("/contact")
        .then(res => dispatch({
            type: GET_CONTACT,
            payload: res.data
        }))
        .catch(() => dispatch({
            type: GET_CONTACT,
            payload: {}
        }));
}

export const getAllContacts = () => dispatch => {
    dispatch(contactLoding());
    axios
      .get("/contact/all")
      .then(res => dispatch({
        type: GET_CONTACTS,
        payload: res.data
      }))
      .catch(() => dispatch({
        type: GET_CONTACTS,
        payload: {}
      }));
}

export const setContact = (newContact, history) => dispatch => {
    axios
        .post("/contact", newContact)
        .then(() => {
            history.push("/view-contacts");
        });
}

export const clearContact = () => {
    return {
        type: CLEAR_CURRENT_CONTACT
    }
}

export const contactLoding = () => {
    return {
        type: CONTACT_LODING
    }
}

export const deleteConntact = (id) => dispatch => {
    axios
      .delete(`/contact/${id}`)
      .then(res => 
          dispatch({
            type: GET_CONTACT,
            payload: res.data
        })
      );
}