import React from "react";
import { connect } from "react-redux";

import { createNewProduct } from "../store/products";

class CreateProduct extends React.Component {
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

    handleSubmit(event) {
        event.preventDefault();
        this.props.createProduct({ ...this.state });
        this.setState({
            productName: "",
            description: "",
            imageUrl: "",
            price: "",
            inventory: "",
            category: ""
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        // console.log("CREATE_PRODUCT STATE > ", this.state);
        const { productName, description, price, category, inventory } =
            this.state;
        return (
            <div className="create-new-product-component">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        name="productName"
                        value={productName}
                        type="text"
                        required
                        onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="description">Product Description:</label>
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
                    <button type="submit">Add Product</button>
                </form>
            </div>
        );
    }
}

const mapDisptach = (dispatch) => ({
    createProduct: (product) => dispatch(createNewProduct(product))
});

export default connect(null, mapDisptach)(CreateProduct);
