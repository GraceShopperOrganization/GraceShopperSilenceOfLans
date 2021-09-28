import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/product";
import {
    getCartContent,
    addNewProductToCart,
    editCartQuantity
} from "../store/orders";
import { updateProduct } from "../store/products";

export class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            description: "",
            imageUrl:
                "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg",
            price: "",
            inventory: "",
            category: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.updateProduct(this.props.product.id, this.state);
        this.setState({
            productName: "",
            description: "",
            imageUrl: "",
            price: "",
            inventory: "",
            category: ""
        });
    }

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
        // console.log("PRODUCT THIS>STATE> ", this.state);
        const product = this.props.product;
        const cart = this.props.cart;
        const { productName, description, price, category, inventory } =
            this.state;

        return (
            <div className="single-product--main-container">
                {this.props.isAdmin ? (
                    <div className="single-product--update">
                        <div className="single-product--left-side-img">
                            <img src={product.imageUrl} />
                        </div>
                        <form
                            className="single-product--update-form"
                            onSubmit={this.handleSubmit}
                        >
                            <label htmlFor="productName">Product Name:</label>
                            <input
                                name="productName"
                                value={productName}
                                type="text"
                                required
                                onChange={this.handleChange}
                            />
                            <br />
                            <label htmlFor="description">
                                Product Description:
                            </label>
                            <input
                                name="description"
                                value={description}
                                required
                                onChange={this.handleChange}
                            />
                            <br />
                            <label htmlFor="price">Price: </label>
                            <input
                                name="price"
                                value={price}
                                required
                                onChange={this.handleChange}
                            />
                            <br />
                            <label htmlFor="category">Category: </label>
                            <input
                                name="category"
                                value={category}
                                required
                                onChange={this.handleChange}
                            />
                            <br />
                            <label htmlFor="inventory">Inventory:</label>
                            <input
                                name="inventory"
                                value={inventory}
                                required
                                onChange={this.handleChange}
                            />
                            <br />
                            <button type="submit" onClick={this.handleSubmit}>
                                Update Product
                            </button>
                        </form>
                    </div>
                ) : (
                    <>
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
                                    onClick={
                                        localStorage.getItem("token")
                                            ? async () => {
                                                  let filtered = cart.filter(
                                                      (item) =>
                                                          item.productId ==
                                                          this.props.match
                                                              .params.productId
                                                  );
                                                  if (filtered.length === 0) {
                                                      await this.props.addToCartNew(
                                                          this.props.auth.id,
                                                          this.props.match
                                                              .params.productId
                                                      );
                                                  } else {
                                                      let newQty =
                                                          filtered[0].quantity +
                                                          1;
                                                      await this.props.addToCartEx(
                                                          this.props.auth.id,
                                                          this.props.match
                                                              .params.productId,
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
                                                      products = JSON.parse(
                                                          localStorage.getItem(
                                                              "products"
                                                          )
                                                      );
                                                  }

                                                  let unique = true;

                                                  for (
                                                      let i = 0;
                                                      i < products.length;
                                                      i++
                                                  ) {
                                                      if (
                                                          products[i]
                                                              .productId ===
                                                          product.id
                                                      ) {
                                                          products[i].quantity =
                                                              products[i]
                                                                  .quantity + 1;
                                                          unique = false;
                                                      }
                                                  }

                                                  if (unique === true) {
                                                      products.push({
                                                          productId: product.id,
                                                          quantity: 1
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
                    </>
                )}
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        product: state.product,
        cart: state.cart,
        auth: state.auth
    };
};

const mapDispatch = (dispatch, { history }) => ({
    getCartContent: (userId) => dispatch(getCartContent(userId)),

    getProduct: (productId) => dispatch(fetchProduct(productId)),

    addToCartNew: (userId, productId) =>
        dispatch(addNewProductToCart(userId, productId)),

    addToCartEx: (userId, productId, quantity) =>
        dispatch(editCartQuantity(userId, productId, quantity)),

    updateProduct: (productId, updates) =>
        dispatch(updateProduct(productId, updates, history))
});

export default connect(mapState, mapDispatch)(Product);
