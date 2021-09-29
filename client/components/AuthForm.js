import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
    const { name, displayName, handleSubmit, error } = props;

    return (
        <div className="login--container">
            <form onSubmit={handleSubmit} name={name} className="login--form">
                <div>
                    <label htmlFor="username">
                        <small className="login--form-username">Username</small>
                    </label>
                    <input name="username" type="text" />
                </div>
                <div>
                    <label htmlFor="password">
                        <small className="login--form-password">Password</small>
                    </label>
                    <input name="password" type="password" />
                </div>
                <div>
                    <button type="submit" className="login--form-submit-btn">
                        {displayName}
                    </button>
                </div>
                {error && error.response && <div> {error.response.data} </div>}
            </form>
        </div>
    );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
    return {
        name: "login",
        displayName: "Login",
        error: state.auth.error
    };
};

const mapSignup = (state) => {
    return {
        name: "signup",
        displayName: "Sign Up",
        error: state.auth.error
    };
};

const mapDispatch = (dispatch, { history }) => {
    return {
        handleSubmit(evt) {
            evt.preventDefault();
            const formName = evt.target.name;
            const username = evt.target.username.value;
            const password = evt.target.password.value;
            dispatch(authenticate(username, password, formName, history));
        }
    };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
