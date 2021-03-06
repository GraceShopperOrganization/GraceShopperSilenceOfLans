import axios from "axios";

// ACTION TYPE------------------------------------------------------
const GET_PRODUCTS = "GET_PRODUCTS";
const CREATE_PRODUCT = "CREATE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

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
export const _updateProduct = (product) => {
    return {
        type: UPDATE_PRODUCT,
        product
    };
};
export const _deleteProduct = (product) => {
    return {
        type: DELETE_PRODUCT,
        product
    };
};

// ASYNC ACTION CREATOR ------------------------------------------------
export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get("/api/products");
            dispatch(_setProducts(data));
        } catch (err) {
            console.log("FETCH PRODUCTS ERR:", err);
        }
    };
};
export const createNewProduct = (product) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
        if (token) {
            try {
                const { data } = await axios.post("/api/products", product, {
                    headers: {
                        authorization: token
                    }
                });
                dispatch(_createProduct(data));
                history.push("/products");
            } catch (err) {
                console.log("CREATE A NEW PRODUCT ERR:", err);
            }
        }
    };
};
export const updateProduct = (productId, updates, history) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
        if (token) {
            try {
                const { data } = await axios.put(
                    `/api/products/${productId}`,
                    updates,
                    {
                        headers: { authorization: token }
                    }
                );
                dispatch(_updateProduct(data));
                history.push("/products");
            } catch (err) {
                console.log("UPDATE PRODUCTS ERR:", err);
            }
        }
    };
};
export const deleteProduct = (productId, history) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
        // console.log("TOKEN > ", token);
        if (token) {
            try {
                const { data } = await axios.delete(
                    `/api/products/${productId}`,
                    {
                        headers: {
                            authorization: token
                        }
                    }
                );
                // console.log("DELETED DATA > ", data);
                dispatch(_deleteProduct(data));
                // history.push("/products");
            } catch (err) {
                console.log("DELETE PRODUCTS ERR:", err);
            }
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
        case UPDATE_PRODUCT:
            return state.map((product) =>
                product.id === action.product.id ? action.product : product
            );
        case DELETE_PRODUCT:
            return state.filter((product) => product.id !== action.product.id);
        default:
            return state;
    }
}
