import React from "react";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import {
  getCartContent,
  editCartQuantity,
  removeProductFromCart,
  _setCart,
  placeOrderUnl,
} from "../store/orders";
import { fetchProducts } from "../store/products";
import { withRouter } from "react-router-dom";

class Cart extends React.Component {
  async componentDidMount() {
    await this.props.getProducts();
    if (!localStorage.getItem("token")) {
      let localCart = JSON.parse(localStorage.getItem("products"));
      if (localCart === null) {
        localCart = [];
      }
      this.props.setCartFromLocalStorage(localCart);
    } else {
      await this.props.getCartContent(this.props.auth.id);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.id !== prevProps.auth.id) {
      await this.props.getCartContent(this.props.auth.id);
    }
  }

  async clickHandler(e) {
    const orderForClient = Math.floor(100000 + Math.random() * 900000);
    if (!localStorage.getItem("token")) {
      let order = JSON.parse(localStorage.getItem("products"));
      await this.props.placeOrderUnlogged(order, orderForClient);
      localStorage.setItem("products", JSON.stringify([]));
    }
    this.props.history.push("/final", orderForClient);
  }

  render() {
    if (this.props.products.length === 0) {
      return null;
    }

    let cartNotLogged = JSON.parse(localStorage.getItem("products"));

    if (this.props.cart.length === 0 && cartNotLogged === null) {
      return (
        <div>
          <p>Cart is empty</p>
        </div>
      );
    }

    let cart = this.props.cart;

    return (
      <div>
        <h2>Cart:</h2>
        {cart.map((cartItem) => (
          <CartItem
            key={cartItem.productId}
            userId={this.props.auth.id}
            cartItem={cartItem}
            product={this.props.products.find(
              (product) => product.id == cartItem.productId
            )}
          />
        ))}
        <div className="cart--total">Total</div>
        <button
          className="cart--checkoutbtn"
          onClick={(e) => this.clickHandler(e)}
        >
          Checkout
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
    products: state.productsReducer,
  };
};

const mapDispatch = (dispatch) => ({
  getCartContent: (userId) => dispatch(getCartContent(userId)),

  getProducts: () => dispatch(fetchProducts()),

  setCartFromLocalStorage: (cart) => dispatch(_setCart(cart)),

  editQty: (userId, productId, quantity) =>
    dispatch(editCartQuantity(userId, productId, quantity)),

  remove: (userId, productId) =>
    dispatch(removeProductFromCart(userId, productId)),

  placeOrderUnlogged: (order, orderForClient) =>
    dispatch(placeOrderUnl(order, orderForClient)),
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
