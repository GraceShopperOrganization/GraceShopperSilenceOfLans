import axios from "axios";

//ACTION TYPES
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";

//ACTION CREATORS
export const addProductToCart = (product) => ({
  type: SET_PRODUCT,
  product,
});

//THUNK CREATORS
export const addToCart = (userId, productId) => async (dispatch) => {
  // 1. get orderId (using userId)
  // 2. post product(using productId, orderId)

  const { data } = await axios.get(`/api/orders/${productId}`);
  dispatch(setProduct(data));
};

//INITIAL STATE
const initialState = {};

// REDUCER
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
