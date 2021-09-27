import axios from "axios";

// ACTION TYPE------------------------------------------------------
const GET_PRODUCTS = "GET_PRODUCTS";
const CREATE_PRODUCT = "CREATE_PRODUCT";

// ACTION CREATOR----------------------------------------------------
export const _setProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    };
};
export const _createProduct = (product) => {
    return {
        type: CREATE_PRODUCT,
        product
    };
};

export const _createProduct = (product) => {
    return {
        type: CREATE_PRODUCT,
        product
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
export const createNewProduct = (product) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post("/api/products", product);
            dispatch(_createProduct(data));
        } catch (err) {
            console.log("CREATE A NEW PRODUCT ERR:", err);
        }
    };
};

export const createNewProduct = (product) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post("/api/products", product);
            dispatch(_createProduct(data));
        } catch (err) {
            console.log("CREATE A NEW PRODUCT ERR:", err);
        }
    };
};

const initialState = [];

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products;
        case CREATE_PRODUCT:
            return [...state, action.product];
        default:
            return state;
    }
}
