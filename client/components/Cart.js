import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    let cartItems = [];
    let products = this.props.products;

    if (localStorage.getItem("token")) {
      //cartItems=request to the backend
    } else {
      cartItems = JSON.parse(localStorage.getItem("products"));
    }

    return (
      <div>
        <h2>Cart:</h2>
        {cartItems.map((product) => {
          return (
            <div key={productId}>
              <img src={product.imageUrl} />
              <h3>Plant name: {product.productName}</h3>
              <h4>Price: {product.price}</h4>
              <button className="addToCartBtn" type="button">
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.productsReducer,
  };
};

const mapDsipatch = (dispatch, { history }) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDsipatch)(Products);
