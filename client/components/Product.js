import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/product";
import {
  getCartContent,
  addNewProductToCart,
  editCartQuantity,
} from "../store/orders";

export class Product extends React.Component {
  async componentDidMount() {
    const productId = Number(this.props.match.params.productId);
    await this.props.getProduct(productId);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.id !== prevProps.auth.id) {
      await this.props.getCartContent(this.props.auth.id);
    }
  }

  render() {
    const product = this.props.product;
    const cart = this.props.cart;

    return (
      <div className="single-product--main-container">
        <div className="single-product--left-side-img">
          <img src={product.imageUrl} />
        </div>
        <div className="single-product--rigth-side-description">
          <p className="single-product--product-name">{product.productName}</p>
          <p className="single-product--description">{product.description}</p>
          <div>
            {product.inventory === 0 ? (
              <p>Sold out!</p>
            ) : (
              <p>${product.price / 100}</p>
            )}
          </div>
          <div>
            <button
              className="single-product--addToCartBtn"
              onClick={
                localStorage.getItem("token")
                  ? async () => {
                      let filtered = cart.filter(
                        (item) =>
                          item.productId == this.props.match.params.productId
                      );
                      if (filtered.length === 0) {
                        await this.props.addToCartNew(
                          this.props.auth.id,
                          this.props.match.params.productId
                        );
                      } else {
                        let newQty = filtered[0].quantity + 1;
                        await this.props.addToCartEx(
                          this.props.auth.id,
                          this.props.match.params.productId,
                          newQty
                        );
                      }
                    }
                  : () => {
                      let products = [];
                      if (localStorage.getItem("products")) {
                        products = JSON.parse(localStorage.getItem("products"));
                      }

                      let unique = true;

                      for (let i = 0; i < products.length; i++) {
                        if (products[i].productId === product.id) {
                          products[i].quantity = products[i].quantity + 1;
                          unique = false;
                        }
                      }

                      if (unique === true) {
                        products.push({
                          productId: product.id,
                          quantity: 1,
                        });
                      }

                      localStorage.setItem(
                        "products",
                        JSON.stringify(products)
                      );
                    }
              }
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  getCartContent: (userId) => dispatch(getCartContent(userId)),

  getProduct: (productId) => dispatch(fetchProduct(productId)),

  addToCartNew: (userId, productId) =>
    dispatch(addNewProductToCart(userId, productId)),

  addToCartEx: (userId, productId, quantity) =>
    dispatch(editCartQuantity(userId, productId, quantity)),
});

export default connect(mapState, mapDispatch)(Product);
