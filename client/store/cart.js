import axios from "axios";

//ACTION TYPES
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";

//ACTION CREATORS

export const _addProductToCart = (product) => ({
  type: ADD_PRODUCT_TO_CART,
  product,
});

//THUNK CREATORS

export const addProductToCart = (productId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/cart/${productId}`);
    dispatch(_addProductToCart(data));
  } catch (error) {
    console.log("ADD PRODUCT TO CART ERR:", error);
  }
};

//INITIAL STATE
const initialState = { items: [], addedItems: [], total: 0 };

// REDUCER
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      let addedItem = state.items.find((item) => item.id === action.id);
      //check if the action id exists in the addedItems
      let existed_item = state.addedItems.find((item) => action.id === item.id);
      if (existed_item) {
        addedItem.quantity += 1;
        return {
          ...state,
          total: state.total + addedItem.price,
        };
      } else {
        addedItem.quantity = 1;
        //calculating the total
        let newTotal = state.total + addedItem.price;
        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal,
        };
      }
    default:
      return state;
  }
}
