import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts } from "../store/products";

class Products extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        return (
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
                                        Plant name: {product.productName}
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
        );
    }
}

const mapState = (state) => {
    console.log("ALL PRODUCTS STATE > ", state);
    return {
        products: state.productsReducer
    };
};

const mapDsipatch = (dispatch, { history }) => {
    return {
        fetchProducts: () => dispatch(fetchProducts())
    };
};

export default connect(mapState, mapDsipatch)(Products);
