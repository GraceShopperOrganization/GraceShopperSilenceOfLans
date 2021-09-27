import axios from "axios";

//ACTION TYPES
const GET_CART_CONTENT = "GET_CART_CONTENT";
const ADD_NEW_PRODUCT_TO_CART = "ADD_NEW_PRODUCT_TO_CART";
const SET_CART_FROM_LOCAL_STORAGE = "SET_CART_FROM_LOCAL_STORAGE";
const EDIT_CART_QUANTITY = "EDIT_CART_QUANTITY";
const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
const PLACE_ORDER = "PLACE_ORDER";

//ACTION CREATORS
export const _getCartContent = (cart) => ({
  type: GET_CART_CONTENT,
  cart,
});

export const _addNewProductToCart = (cart) => ({
  type: ADD_NEW_PRODUCT_TO_CART,
  cart,
});

export const _setCart = (cart) => ({
  type: SET_CART_FROM_LOCAL_STORAGE,
  cart,
});

export const _editCartQuantity = (cart) => ({
  type: EDIT_CART_QUANTITY,
  cart,
});

export const _removeProductFromCart = (cart) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  cart,
});

export const _placeOrder = (cart) => ({
  type: PLACE_ORDER,
  cart,
});

//THUNK CREATORS
export const getCartContent = (userId) => async (dispatch) => {
  const { data } = await axios.get(`/api/orders/cart/${userId}`);
  dispatch(_getCartContent(data));
};

export const addNewProductToCart = (userId, productId) => async (dispatch) => {
  const { data } = await axios.post(`/api/orders/cart/${userId}/${productId}`);
  dispatch(_addNewProductToCart(data));
};

export const editCartQuantity =
  (userId, productId, quantity) => async (dispatch) => {
    const { data } = await axios.put(
      `/api/orders/cart/${userId}/${productId}`,
      {
        quantity,
      }
    );
    dispatch(_editCartQuantity(data));
  };

export const removeProductFromCart =
  (userId, productId) => async (dispatch) => {
    const { data } = await axios.delete(
      `/api/orders/cart/${userId}/${productId}`
    );
    dispatch(_removeProductFromCart(data));
  };

//INITIAL STATE
const initialState = [];

// REDUCER
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_CONTENT:
      return action.cart;
    case ADD_NEW_PRODUCT_TO_CART:
      return action.cart;
    case SET_CART_FROM_LOCAL_STORAGE:
      return action.cart;
    case EDIT_CART_QUANTITY:
      return action.cart;
    case REMOVE_PRODUCT_FROM_CART:
      return action.cart;
    default:
      return state;
  }
}