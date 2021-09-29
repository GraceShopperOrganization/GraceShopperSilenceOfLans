import React from "react";
import { Link } from "react-router-dom";

import Products from "./Products";

class FinalPage extends React.Component {
  render() {
    return (
      <div>
        <h2>Your order #{this.props.location.state} successfully placed!</h2>
        <div className="center">
          <Link to={`/products`}>
            <button className="cart--backtoallprodbtn" type="button">
              Go back to the All Products Page
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default FinalPage;
