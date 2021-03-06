import axios from "axios";

//ACTION TYPES
const SET_PRODUCT = "SET_PRODUCT";

//ACTION CREATORS
export const setProduct = (product) => ({
  type: SET_PRODUCT,
  product,
});

//THUNK CREATORS
export const fetchProduct = (productId) => async (dispatch) => {
  const { data } = await axios.get(`/api/products/${productId}`);
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
