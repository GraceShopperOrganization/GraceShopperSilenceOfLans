import React from "react";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import {
  getCartContent,
  editCartQuantity,
  removeProductFromCart,
  _setCart,
  placeOrderUnl, placeOrder
} from "../store/orders";
import { fetchProducts } from "../store/products";
import { withRouter } from "react-router-dom";

class Cart extends React.Component {
  constructor(){
    super()
    this.state = {
      total: 0
    }
  }

  async componentDidMount() {
    await this.props.getProducts();
    if (!localStorage.getItem("token")) {
      let localCart = JSON.parse(localStorage.getItem("products"));
      if (localCart === null) {
        localCart = [];
      }
      this.props.setCartFromLocalStorage(localCart);
    } else if (this.props.auth.id){
      await this.props.getCartContent(this.props.auth.id);
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.auth.id !== prevProps.auth.id){
      await this.props.getCartContent(this.props.auth.id);
    }
    if (this.props.cart !== prevProps.cart) {
      this.calculateOrderTotal()
    }
  }

  calculateOrderTotal = () => {
    const { cart, products } = this.props;
    const cartItems = cart.map(cartItem => {
      const product = products.find(
        (item) => item.id == cartItem.productId
      )
      cartItem.price = product.price;
      return cartItem
    })

    let subtotal = 0
    cartItems.forEach(item => {
      subtotal += item.quantity * item.price
    });
    this.setState(
      { total: subtotal/100 }
    )
  }

  async clickHandler(e) {
    const orderForClient = Math.floor(100000 + Math.random() * 900000);
    if (!localStorage.getItem("token")) {
      let order = JSON.parse(localStorage.getItem("products"));
      await this.props.placeOrderUnlogged(order, orderForClient);
      localStorage.setItem("products", JSON.stringify([]));
    } else {
      const { auth, checkout, cart } = this.props

      try {
        await checkout(auth.id, cart)
      } catch (error){
        console.log('checkoutHandler error:', error)
      }
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

        <div className="cart--total">Total ${this.state.total}</div>
          {this.props.cart.length === 0 ? null:
          <button onClick={(e) => this.clickHandler(e)} className="cart--checkoutbtn">Checkout</button>}
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

  checkout: (userId, cart) =>
    dispatch(placeOrder(userId, cart))
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
