import React from "react";
import { connect } from "react-redux";
import Userlist from "./Userlist";

/**
 * COMPONENT
 */
export const Home = (props) => {
    const { username } = props;

    return (
        <div className="home--img-container">
            {/* <h3>Welcome, {username}</h3> */}
            {/* <img
                src="https://images.unsplash.com/photo-1543719210-2ffbd740ee9a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2952&q=80"
                alt="new"
                className="home--img"
            /> */}
        </div>
    );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        username: state.auth.username
    };
};

export default connect(mapState)(Home);
