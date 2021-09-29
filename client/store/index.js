import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import userlistReducer from "./userlist";
import productsReducer from "./products";
import productReducer from "./product";
import usersReducer from "./users";
import cartReducer from "./orders";

const reducer = combineReducers({
    auth,
    productsReducer,
    product: productReducer,
    userlist: userlistReducer,
    usersReducer,
    cart: cartReducer
});
const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
