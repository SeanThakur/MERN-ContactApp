import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import {getCurrentContact, deleteConntact} from "../../redux/actions/contact";

class Contacts extends Component {

    componentDidMount() {
        this.props.getCurrentContact();
    }

    onDelete(id)
    {
        this.props.deleteConntact(id);
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
                contactItem = contact.contact.slice(0,5).map(contact => (
                        <div>
                            <div className="card border-info">
                                <div className="card-body">
                                    <div className="d-flex bd-highlight">
                                        <h5 className="card-title flex-grow-1 bd-highlight">
                                            {contact.title}
                                        </h5>
                                        <button className="btn btn-info btn-sm bd-highlight">
                                            <i className="fa fa-phone"></i>{" "}
                                            {contact.phoneType}
                                        </button>
                                    </div>
                                    <br />
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {contact.body}
                                    </h6>
                                    <p className="card-text">
                                        <i className="fa fa-mobile"></i> {" "}
                                        {contact.phoneNo}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex bd-highlight">
                                        <button type="button" onClick={this.onDelete.bind(this,contact._id)} className="m-1 btn btn-danger btn-sm flex-fill bd-highlight"> 
                                            <i className="fa fa-minus-circle"></i> {" "}
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>
                ));
            } else {
                contactItem = (
                <div className="lead text-center">Hello {user.name}, You have not created any contact.</div>
                );
            }
        }

        return (
            <div>
            {
                contactItem
            }
            </div>
        )
    }
}

Contacts.propTypes = {
    auth: PropTypes.object.isRequired,
    contact: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getCurrentContact: PropTypes.func.isRequired,
    deleteConntact: PropTypes.func.isRequired
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    contact: state.contact,
    errors: state.errors
});

export default connect(mapStateToProps, {getCurrentContact,deleteConntact})(withRouter(Contacts));
