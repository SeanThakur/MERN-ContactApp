import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import {getAllContacts} from "../../redux/actions/contact";

class AllContact extends Component {
    componentDidMount()
    {
        this.props.getAllContacts();
    }
    render() {
        const {contacts, isLoding} = this.props.contact;

        let contactsItem;

        if(contacts === null || isLoding === true)
        {
            contactsItem = (
                <div>
                    <p className="lead text-center">Loding...</p>
                </div>
            )
        } else {
            if(contacts.contacts.length > 0)
            {
                contactsItem = contacts.contacts.map((contacts,i) => (
                    <div key={i}>
                        <div className="card border-dark">
                        <div className="card-body">
                            <div className="d-flex bd-highlight">
                                <h5 className="card-title flex-grow-1 bd-highlight">
                                    <i className="fa fa-user"></i>{" "}
                                    {contacts.user.name}
                                </h5>
                                <button className="btn btn-info btn-sm bd-highlight">
                                    <i className="fa fa-phone"></i>{" "}
                                    {contacts.phoneType}
                                </button>
                            </div>
                            <h6 className="card-subtitle mb-2 text-muted">
                                <i className="fa fa-envelope-open"></i>{" "}
                                {contacts.user.email}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted lead">
                                <i className="fa fa-book"></i>{" "}
                                {contacts.body}
                            </h6>
                            <p className="card-text">
                                <i className="fa fa-mobile"></i> {" "}
                                {contacts.phoneNo}
                            </p>
                        </div>
                    </div>
                    <br />
                    </div>
                ));
            }else {
                contactsItem = (
                    <div className="lead text-center">There is no contact.</div>
                )
            }
        }

        return (
            <div className="container">
                 <div className="row">
                <div className="col-lg-10">
                    {
                        contactsItem
                    }
                </div>
            </div>
            </div>
        )
    }
}

AllContact.propTypes = {
    contact: PropTypes.object.isRequired,
    getAllContacts: PropTypes.func.isRequired
}
  
const mapStateToProps = (state) => ({
    contact: state.contact
});

export default connect(mapStateToProps, {getAllContacts})(AllContact);
