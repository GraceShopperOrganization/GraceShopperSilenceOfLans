import axios from "axios";

// ACTION TYPE------------------------------------------------------
const GET_PRODUCTS = "GET_PRODUCTS";

// ACTION CREATOR----------------------------------------------------
export const _setProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    };
};

// ASYNC ACTION CREATOR ------------------------------------------------
export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get("/api/products");
            // console.log("ASYNC FETCH CAMPUSES DATA > ", data);
            dispatch(_setProducts(data));
        } catch (err) {
            console.log("FETCH PRODUCTS ERR:", err);
        }
    };
};

const initialState = [];

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}
