import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {getCurrentContact} from "../../redux/actions/contact";

class ViewContacts extends Component {
    componentDidMount()
    {
        this.props.getCurrentContact();
    }
    render() {
        const {user} = this.props.auth;
        const {contact,isLoding} = this.props.contact;

        let contactItem;

        if(contact === null || isLoding === true)
        {
            contactItem = (
                <div className="text-center">Loding...</div>
            )
        }else {
            if(contact.contact.length > 0)
            {
                contactItem = contact.contact.map(contact => (
                    <div>
                        <div className="container">
                 <div className="row">
                <div className="col-lg-10">
                    <div className="card border-dark">
                        <div className="card-body">
                            <div className="d-flex bd-highlight">
                                <h5 className="card-title flex-grow-1 bd-highlight">
                                    <i className="fa fa-user"></i>{" "}
                                    {contact.title}
                                </h5>
                                <button className="btn btn-info btn-sm bd-highlight">
                                    <i className="fa fa-phone"></i>{" "}
                                    {contact.phoneType}
                                </button>
                            </div>
                            <h6 className="card-subtitle mb-2 text-muted">
                                <i className="fa fa-envelope-open"></i>{" "}
                                {contact.body}
                            </h6>
                            <p className="card-text">
                                <i className="fa fa-mobile"></i> {" "}
                                {contact.phoneNo}
                            </p>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
            </div>
                    </div>
                ));
            }else{
                contactItem = (
                    <div className="lead text-center">Hello {user.name}, You have not created any contact.</div>
                    );
            }
        }
        return (
            <div>
                <p className="display-4 h3 lead text-dark text-center">Your All Contacts</p>
                <br />
                {
                    contactItem
                }
            </div>  
        )
    }
}

ViewContacts.propTypes = {
    auth: PropTypes.object.isRequired,
    contact: PropTypes.object.isRequired,
    getCurrentContact: PropTypes.func.isRequired
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    contact: state.contact
});

export default connect(mapStateToProps, {getCurrentContact})(ViewContacts);
