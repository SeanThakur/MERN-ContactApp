import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux"

class Landing extends Component {
  componentDidMount()
  {
      if(this.props.auth.isAuthenticated)
      {
          this.props.history.push('/dashboard');
      }
      
  }
    render() {
        return (
            <div className="landing">
            <div className="dark-overlay landing-inner text-light">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center">
                    <h1 className="display-3 mb-4"> <i className="fa fa-address-card"></i> {" "} Contact Person
                    </h1>
                    <p className="lead"> Find the true identity of the person just from there Phone Number.</p>
                    <hr />
                    <Link to="/signup" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                    <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Landing);
