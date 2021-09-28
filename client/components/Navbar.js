import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
    <div id="navbar">
        <img src="/Logo.png" className="logo" />

        <Link to="/products">
            <h1>GreenShopper</h1>
        </Link>

        <nav>
            {isLoggedIn ? (
                <div className="login-buttons">
                    {/* The navbar will show these links after you log in */}
                    <Link to="/home">Home</Link>
                    <Link to="/create">Create Product</Link>
                    <a href="#" onClick={handleClick}>
                        Logout
                    </a>
                </div>
            ) : (
                <div className="login-buttons">
                    {/* The navbar will show these links before you log in */}
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Login</Link>
                </div>
            )}
            <Link to="/cart">
                <img src="/CartIcon.png" />
            </Link>
        </nav>
    </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        isLoggedIn: !!state.auth.id
    };
};

const mapDispatch = (dispatch) => {
    return {
        handleClick() {
            dispatch(logout());
        }
    };
};

export default connect(mapState, mapDispatch)(Navbar);
