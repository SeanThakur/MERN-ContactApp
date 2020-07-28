import React, { Component } from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import { getSignUP } from "../../redux/actions/auth"

class Signup extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
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
        
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.getSignUP(newUser, this.props.history);
        
    }

    componentDidMount()
    {
        if(this.props.auth.isAuthenticated)
        {
            this.props.history.push('/dashboard');
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors)
        {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your Contact account</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text" onChange={this.onChange} value={this.state.name} className="form-control form-control-lg" placeholder="Name" name="name" required/>
                        </div>
                        <div className="form-group">
                            <input type="email" onChange={this.onChange} value={this.state.email} className={classnames("form-control form-control-lg", {"is-invalid": this.state.errors.email})} placeholder="Email Address" name="email" required/>
                            {
                                this.state.errors.email && (
                                <div className="invalid-feedback">{this.state.errors.email}</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" onChange={this.onChange} value={this.state.password} className="form-control form-control-lg" placeholder="Password" name="password" required/>
                        </div>
                        <div className="form-group">
                            <input type="password" onChange={this.onChange} value={this.state.password2} className={classnames("form-control form-control-lg", {"is-invalid": this.state.errors.password})} placeholder="Confirm Password" name="password2" required/>
                            {
                                this.state.errors.password && (
                                <div className="invalid-feedback">{this.state.errors.password}</div>
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

Signup.propTypes = {
    getSignUP: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {getSignUP})(withRouter(Signup));
