import React from "react";
import { connect } from "react-redux";

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
            <div>
                <h2>ALL PRODUCTS:</h2>
                {this.props.products.map((product) => {
                    return (
                        <div key={product.id}>
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
