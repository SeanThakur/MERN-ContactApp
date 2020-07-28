import React, { Component } from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import { getLogin } from "../../redux/actions/auth";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const newLogin = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.getLogin(newLogin);
    }

    componentDidMount()
    {
        if(this.props.auth.isAuthenticated)
        {
            this.props.history.push('/dashboard');
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated)
        {
            this.props.history.push("/dashboard");
        }
        if(nextProps.errors)
        {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your Contact account</p>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="email" value={this.state.email} onChange={this.onChange} className={classnames("form-control form-control-lg", {"is-invalid": this.state.errors.user})} placeholder="Email Address" name="email" required/>
                                {
                                    this.state.errors.user && (
                                        <div className="invalid-feedback">
                                            {this.state.errors.user}
                                        </div>
                                    )
                                }
                            </div>
                            <div className="form-group">
                                <input type="password" value={this.state.password} onChange={this.onChange} className={classnames("form-control form-control-lg", {"is-invalid": this.state.errors.password})} placeholder="Password" name="password" required/>
                                {
                                    this.state.errors.password && (
                                        <div className="invalid-feedback">
                                            {this.state.errors.password}
                                        </div>
                                    )
                                }
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                        </div>
                    </div>
                </div>
          </div>
        )
    }
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {getLogin})(withRouter(Login));
