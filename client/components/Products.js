import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    getCartContent,
    addNewProductToCart,
    editCartQuantity
} from "../store/orders";
import { fetchProducts, deleteProduct } from "../store/products";
import CreateProduct from "./CreateProduct";

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    handleClick(event) {
        event.preventDefault();
        // console.log("TARGET VALUE > ", Number(event.currentTarget.value));
        this.props.deleteProduct(Number(event.currentTarget.value));
    }

    render() {
        console.log("ALL-PRODUCTS THIS.PROPS > ", this.props);
        // if (!this.props.isLoggedIn) {
        //     return <div>LOADING....</div>;
        // }
        return (
            <div>
                {this.props.isAdmin ? (
                    <div className="all-products--main--container">
                        <div className="all-products--container">
                            {this.props.products.map((product) => {
                                return (
                                    <div
                                        key={product.id}
                                        className="all-products--single-container"
                                    >
                                        <Link
                                            to={`/products/${product.id}`}
                                            key={product.id}
                                        >
                                            <img
                                                src={product.imageUrl}
                                                className="all-products--single-container-img"
                                            />
                                        </Link>
                                        <div className="all-products--single-contnr-description">
                                            <h3 className="all-products--single-contnr-text">
                                                Plant name:{" "}
                                                {product.productName}
                                            </h3>
                                            <h4>Price: ${product.price}</h4>
                                            <button
                                                className="all-products--remove-product"
                                                type="submit"
                                                value={product.id}
                                                onClick={this.handleClick}
                                            >
                                                Delete Product
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="all-products--main--container">
                        <div className="all-products--container">
                            {this.props.products.map((product) => {
                                return (
                                    <div
                                        key={product.id}
                                        className="all-products--single-container"
                                    >
                                        <Link
                                            to={`/products/${product.id}`}
                                            key={product.id}
                                        >
                                            <img
                                                src={product.imageUrl}
                                                className="all-products--single-container-img"
                                            />
                                        </Link>
                                        <div className="all-products--single-contnr-description">
                                            <h3 className="all-products--single-contnr-text">
                                                Plant name:{" "}
                                                {product.productName}
                                            </h3>
                                            <h4>Price: ${product.price}</h4>
                                            <button
                                                className="all-products--addToCartBtn"
                                                type="button"
                                                onClick={
                                                    localStorage.getItem(
                                                        "token"
                                                    )
                                                        ? async () => {
                                                              let filtered =
                                                                  this.props.cart.filter(
                                                                      (
                                                                          item
                                                                      ) => {
                                                                          console.log(
                                                                              "ITEM > ",
                                                                              item
                                                                          );
                                                                          return (
                                                                              item.productId ==
                                                                              product.id
                                                                          );
                                                                      }
                                                                  );
                                                              console.log(
                                                                  "FILTERD_ITEMS > ",
                                                                  filtered
                                                              );
                                                              if (
                                                                  filtered.length ===
                                                                  0
                                                              ) {
                                                                  await this.props.addToCartNew(
                                                                      this.props
                                                                          .auth
                                                                          .id,
                                                                      product.id
                                                                  );
                                                              } else {
                                                                  let newQty =
                                                                      filtered[0]
                                                                          .quantity +
                                                                      1;
                                                                  await this.props.addToCartEx(
                                                                      this.props
                                                                          .auth
                                                                          .id,
                                                                      product.id,
                                                                      newQty
                                                                  );
                                                              }
                                                          }
                                                        : () => {
                                                              let products = [];
                                                              if (
                                                                  localStorage.getItem(
                                                                      "products"
                                                                  )
                                                              ) {
                                                                  products =
                                                                      JSON.parse(
                                                                          localStorage.getItem(
                                                                              "products"
                                                                          )
                                                                      );
                                                              }

                                                              let unique = true;

                                                              for (
                                                                  let i = 0;
                                                                  i <
                                                                  products.length;
                                                                  i++
                                                              ) {
                                                                  if (
                                                                      products[
                                                                          i
                                                                      ]
                                                                          .productId ===
                                                                      product.id
                                                                  ) {
                                                                      products[
                                                                          i
                                                                      ].quantity =
                                                                          products[
                                                                              i
                                                                          ]
                                                                              .quantity +
                                                                          1;
                                                                      unique = false;
                                                                  }
                                                              }

                                                              if (
                                                                  unique ===
                                                                  true
                                                              ) {
                                                                  products.push(
                                                                      {
                                                                          productId:
                                                                              product.id,
                                                                          quantity: 1
                                                                      }
                                                                  );
                                                              }

                                                              localStorage.setItem(
                                                                  "products",
                                                                  JSON.stringify(
                                                                      products
                                                                  )
                                                              );
                                                          }
                                                }
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapState = (state) => {
    console.log("ALL PRODUCTS STATE > ", state);
    return {
        products: state.productsReducer,
        isAdmin: state.auth.isAdmin,
        isLoggedIn: !!state.auth.id,
        cart: state.cart,
        auth: state.auth
    };
};

const mapDsipatch = (dispatch, { history }) => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        deleteProduct: (productId) =>
            dispatch(deleteProduct(productId, history)),
        getCartContent: (userId) => dispatch(getCartContent(userId)),
        addToCartNew: (userId, productId) =>
            dispatch(addNewProductToCart(userId, productId)),
        addToCartEx: (userId, productId, quantity) =>
            dispatch(editCartQuantity(userId, productId, quantity))
    };
};

export default connect(mapState, mapDsipatch)(Products);
