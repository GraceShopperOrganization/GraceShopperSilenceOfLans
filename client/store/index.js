import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import userlist from "./userlist";
import productsReducer from "./products";
import productReducer from "./product";

const reducer = combineReducers({ auth, productsReducer, product: productReducer,userlist });
const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))

);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
