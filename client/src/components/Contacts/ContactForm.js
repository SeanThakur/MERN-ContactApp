import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {setContact} from "../../redux/actions/contact";
import {withRouter} from "react-router-dom";

class ContactForm extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            title: '',
            body: '',
            phoneNo: '',
            phoneType: 'Personal',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const newContact = {
            title: this.state.title,
            body: this.state.body,
            phoneNo: this.state.phoneNo,
            phoneType: this.state.phoneType
        }
        this.props.setContact(newContact, this.props.history);
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h4 className="text-muted">Title</h4>
                        <input type="text" value={this.state.title} onChange={this.onChange} className="form-control form-control-lg" placeholder="Enter Title" name="title" required/>
                    </div>
                    <div className="form-group">
                        <h4 className="text-muted">Body</h4>
                        <input type="text" value={this.state.body} onChange={this.onChange} className="form-control form-control-lg" placeholder="Enter body" name="body" required/>
                    </div>
                    <div className="form-group">
                        <h4 className="text-muted">Phone number</h4>
                        <input type="number" value={this.state.phoneNo} onChange={this.onChange} className="form-control form-control-lg" placeholder="Enter Phone Number" name="phoneNo" required/>
                    </div>
                        <input type="radio" defaultChecked={this.state.phoneType === "Personal"} onChange={this.onChange} name="phoneType" value="Personal" />{' '}Personal
                        {"  "}
                        <input type="radio" defaultChecked={this.state.phoneType === "Business"} name="phoneType" onChange={this.onChange} value="Business" />{' '}Business

                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}

ContactForm.propTypes = {
    auth: PropTypes.object.isRequired,
    contact: PropTypes.object.isRequired,
    setContact: PropTypes.func.isRequired
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    contact: state.contact,
});

export default connect(mapStateToProps, {setContact})(withRouter(ContactForm));
