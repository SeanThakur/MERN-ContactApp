import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import {setLogout} from "../../redux/actions/auth";
import {clearContact} from "../../redux/actions/contact";

class Navbar extends Component {

  logoutClicked(e) {
    e.preventDefault();
    this.props.clearContact();
    this.props.setLogout(this.props.history);
  }

    render() {

      const {user, isAuthenticated} = this.props.auth;

      let authLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a href="" className="nav-link" style={{cursor: "pointer"}} onClick={this.logoutClicked.bind(this)}>
              <i className="fa fa-sign-out"></i>{' '}
              Logout {user.name}
            </a>
          </li>
      </ul>
      );

      let guestLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
      </ul>
      )
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
              <div className="container">
                <Link className="navbar-brand" to="/">
                  <i className="fa fa-address-card"></i> {" "}
                  Contact App
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                  <span className="navbar-toggler-icon"></span>
                </button>
          
                <div className="collapse navbar-collapse" id="mobile-nav">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/contacts"> All Contacts
                      </Link>
                    </li>
                    {
                      isAuthenticated ? (
                        <li className="nav-item">
                          <Link className="nav-link" to="/view-contacts"> View Contacts
                          </Link>
                        </li>
                      ) : ''
                    }
                  </ul>
          
                {
                  isAuthenticated ? authLinks : guestLinks
                }

                </div>
              </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  setLogout: PropTypes.func.isRequired,
  clearContact: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {setLogout,clearContact})(Navbar);
