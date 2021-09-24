import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/product";

export class Product extends React.Component {
    async componentDidMount() {
        const productId = Number(this.props.match.params.productId);
        await this.props.getProduct(productId);
    }

    render() {
        const product = this.props.product;

        return (
            <div className="single-product--main-container">
                <div className="single-product--left-side-img">
                    <img src={product.imageUrl} />
                </div>
                <div className="single-product--rigth-side-description">
                    <p className="single-product--product-name">
                        {product.productName}
                    </p>
                    <p className="single-product--description">
                        {product.description}
                    </p>
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
                            onClick={async () => {
                                await this.props.addToCart(product.id);
                                await this.props.getProduct(productId);
                            }}
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
        product: state.product
    };
};

const mapDispatch = (dispatch) => ({
    getProduct: (productId) => dispatch(fetchProduct(productId)),
    addToCart: (productId) => dispatch(addToCart(productId)) //need to create cart component so we can work on adding to cart functionality
});

export default connect(mapState, mapDispatch)(Product);
