import React from "react";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import {
  getCartContent,
  editCartQuantity,
  removeProductFromCart,
} from "../store/orders";
import { fetchProducts } from "../store/products";

class Cart extends React.Component {
  async componentDidMount() {
    await this.props.getProducts();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.id !== prevProps.auth.id) {
      await this.props.getCartContent(this.props.auth.id);
    }
  }

  render() {
    if (this.props.products.length === 0) {
      return null;
    }

    let cartNotLogged = JSON.parse(localStorage.getItem("products"));

    if (this.props.cart.length === 0 && cartNotLogged.length === 0) {
      return (
        <div>
          <p>Cart is empty</p>
        </div>
      );
    }

    let cart = [];

    if (localStorage.getItem("token")) {
      cart = this.props.cart;
    } else {
      cart = JSON.parse(localStorage.getItem("products"));
    }

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
        <div>Total</div>
        <button>Checkout</button>
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

  editQty: (userId, productId, quantity) =>
    dispatch(editCartQuantity(userId, productId, quantity)),

  remove: (userId, productId) =>
    dispatch(removeProductFromCart(userId, productId)),
});

export default connect(mapState, mapDispatch)(Cart);
