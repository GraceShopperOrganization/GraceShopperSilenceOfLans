import axios from "axios";

//action type
const GET_USERS = "GET_USERS";

//action creator
const getUsers = (users) => ({
  type: GET_USERS,
  users,
});

//thunk
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/users");
      dispatch(getUsers(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
}
