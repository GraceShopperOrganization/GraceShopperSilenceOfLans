import React from "react";
import { connect } from "react-redux";
import { editCartQuantity, removeProductFromCart } from "../store/orders";

class CartItem extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.product.imageUrl} />
        <div>{this.props.product.productName}</div>
        <div>${this.props.product.price}</div>
        <button
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
            }
          }}
        >
          -
        </button>
        <div>{this.props.cartItem.quantity}</div>
        <button
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
            }
          }}
        >
          +
        </button>
        <div>${this.props.product.price * this.props.cartItem.quantity}</div>
        <button
          onClick={async () => {
            if (localStorage.getItem("token")) {
              await this.props.remove(this.props.userId, this.props.product.id);
            } else {
              let cart = JSON.parse(localStorage.getItem("products"));

              let newCart = cart.filter(
                (item) => item.productId !== this.props.product.id
              );
              localStorage.setItem("products", JSON.stringify(newCart));
            }
          }}
        >
          Remove from cart
        </button>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  editQty: (userId, productId, quantity) =>
    dispatch(editCartQuantity(userId, productId, quantity)),

  remove: (userId, productId) =>
    dispatch(removeProductFromCart(userId, productId)),
});

export default connect(null, mapDispatch)(CartItem);
