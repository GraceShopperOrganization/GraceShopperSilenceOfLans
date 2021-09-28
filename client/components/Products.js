import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
        console.log("TARGET VALUE > ", Number(event.currentTarget.value));
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
                                                // onClick={() =>
                                                //     deleteProduct(product.id)
                                                // }
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
        isLoggedIn: !!state.auth.id
    };
};

const mapDsipatch = (dispatch, { history }) => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        deleteProduct: (productId) =>
            dispatch(deleteProduct(productId, history))
    };
};

export default connect(mapState, mapDsipatch)(Products);
