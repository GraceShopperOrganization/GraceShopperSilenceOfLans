import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import Userlist from "./components/Userlist";
import Products from "./components/Products";
import Product from "./components/Product";
import CreateProduct from "./components/CreateProduct";

import NewUser from "./components/NewUser";
import Cart from "./components/Cart";

/**
 * COMPONENT
 */

class Routes extends Component {
    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {
        const { isLoggedIn, isAdmin } = this.props;

        return (
            <div>
                {isAdmin ? (
                    <Switch>
                        <Route exact path="/users" component={Userlist} />
                        <Route
                            exact
                            path="/products/create"
                            component={CreateProduct}
                        />
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path="/users">
                            For Admins Only!
                        </Route>
                        <Route exact path="/products/create">
                            For Admins Only!
                        </Route>
                    </Switch>
                )}

                {isLoggedIn ? (
                    <Switch>
                        <Route exact path="/cart" component={Cart} />
                        {/* //add checkout here */}
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={NewUser} />
                        <Route exact path="/cart" component={Cart} />
                        {/* //add checkout here */}
                    </Switch>
                )}
                <Switch>
                    <Route
                        exact
                        path="/products/:productId(\d+)"
                        component={Product}
                    />
                    <Route exact path="/products" component={Products} />
                </Switch>
            </div>
        );
    }
}

/**
 * CONTAINER
 */

const mapState = (state) => {
    return {
        // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
        // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
        isLoggedIn: !!state.auth.id,
        isAdmin: state.auth.isAdmin
    };
};

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(me());
        }
    };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
