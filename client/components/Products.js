import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts } from "../store/products";
import CreateProduct from "./CreateProduct";

class Products extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        console.log("ALL-PRODUCTS THIS.PROPS > ", this.props);
        // if (!this.props.isLoggedIn) {
        //     return <div>LOADING....</div>;
        // }
        return (
            <div>
                {this.props.isAdmin ? (
                    <div>
                        <div className="all-products--create-new-product">
                            <h4>Add A New Product</h4>
                            <CreateProduct />
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
                {/* <h1>hello</h1> */}
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
        fetchProducts: () => dispatch(fetchProducts())
    };
};

export default connect(mapState, mapDsipatch)(Products);

{
    /* {this.props.isAdmin ? (
                    <div>
                        <div className="all-products--create-new-product">
                        <h4>
                            Add A New Product
                        </h4>
                        <CreateProduct />
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
                )} */
}

// ---------
// <div className="all-products--main--container">
//     <div>
//         <div className="all-products--create-new-product">
//             <h4>Add A New Product</h4>
//             <CreateProduct />
//         </div>
//         <div className="all-products--container">
//             {this.props.products.map((product) => {
//                 return (
//                     <div
//                         key={product.id}
//                         className="all-products--single-container"
//                     >
//                         <Link
//                             to={`/products/${product.id}`}
//                             key={product.id}
//                         >
//                             <img
//                                 src={product.imageUrl}
//                                 className="all-products--single-container-img"
//                             />
//                         </Link>
//                         <div className="all-products--single-contnr-description">
//                             <h3 className="all-products--single-contnr-text">
//                                 Plant name: {product.productName}
//                             </h3>
//                             <h4>Price: ${product.price}</h4>
//                             <button
//                                 className="all-products--addToCartBtn"
//                                 type="button"
//                             >
//                                 Add to cart
//                             </button>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     </div>
// </div>
