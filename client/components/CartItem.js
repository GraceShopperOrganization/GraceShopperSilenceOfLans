import React from "react";
import { connect } from "react-redux";
import {
  editCartQuantity,
  removeProductFromCart,
  _setCart,
} from "../store/orders";

class CartItem extends React.Component {
  render() {
    return (
      <div className="cart--main-container">
        <img className="cart-product--img" src={this.props.product.imageUrl} />
        <div className="cart--product-name">
          {this.props.product.productName}
        </div>
        <div className="cart--product-price">${this.props.product.price}</div>
        <button
          className="cart--plusminusbtn"
          onClick={async () => {
            const newQty = this.props.cartItem.quantity - 1;

            if (localStorage.getItem("token")) {
              await this.props.editQty(
                this.props.userId,
                this.props.product.id,
                newQty
              );
            } else {
              let cart = JSON.parse(localStorage.getItem("products"));

              for (let i = 0; i < cart.length; i++) {
                if (cart[i].productId === this.props.product.id) {
                  cart[i].quantity = newQty;
                }
              }
              localStorage.setItem("products", JSON.stringify(cart));
              this.props.setCartFromLocalStorage(cart);
            }
          }}
        >
          -
        </button>
        <div className="cart--product-qty">{this.props.cartItem.quantity}</div>
        <button
          className="cart--plusminusbtn"
          onClick={async () => {
            const newQty = this.props.cartItem.quantity + 1;

            if (localStorage.getItem("token")) {
              await this.props.editQty(
                this.props.userId,
                this.props.product.id,
                newQty
              );
            } else {
              let cart = JSON.parse(localStorage.getItem("products"));

              for (let i = 0; i < cart.length; i++) {
                if (cart[i].productId === this.props.product.id) {
                  cart[i].quantity = newQty;
                }
              }
              localStorage.setItem("products", JSON.stringify(cart));
              this.props.setCartFromLocalStorage(cart);
            }
          }}
        >
          +
        </button>
        <div className="cart--product-subtotal">
          ${this.props.product.price * this.props.cartItem.quantity}
        </div>
        <button
          className="cart--plusminusbtn"
          onClick={async () => {
            if (localStorage.getItem("token")) {
              await this.props.remove(this.props.userId, this.props.product.id);
            } else {
              let cart = JSON.parse(localStorage.getItem("products"));

              let newCart = cart.filter(
                (item) => item.productId !== this.props.product.id
              );
              localStorage.setItem("products", JSON.stringify(newCart));
              this.props.setCartFromLocalStorage(cart);
            }
          }}
        >
          X
        </button>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  editQty: (userId, productId, quantity) =>
    dispatch(editCartQuantity(userId, productId, quantity)),

  setCartFromLocalStorage: (cart) => dispatch(_setCart(cart)),

  remove: (userId, productId) =>
    dispatch(removeProductFromCart(userId, productId)),
});

export default connect(null, mapDispatch)(CartItem);
