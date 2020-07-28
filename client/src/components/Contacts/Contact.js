import React, { Component } from 'react'
import ContactForm from "./ContactForm";
import Contacts from "./Contacts";
import PropTypes from 'prop-types';
import { connect } from "react-redux"

class Contact extends Component {
  componentDidMount()
  {
      if(this.props.auth.isAuthenticated)
      {
          this.props.history.push('/dashboard');
      }

      if(this.props.auth.isAuthenticated === false)
      {
          this.props.history.push('/login');
      }
      
  }
    render() {
        const {user} = this.props.auth;
        return (
            <div className="container">
              <p className="lead display-4 text-center">Welcome {user.name}</p>
              <br />
            <div className="row">
              <div className="col-md-8">
                <ContactForm />
              </div>
              <div className="col-md-4">
                <Contacts />
              </div>
            </div>
          </div>
        )
    }
}
Contact.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Contact);
