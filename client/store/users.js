import axios from 'axios'

const initialState = []

//Action Constants
const CREATE_USER = 'CREATE_USER'

//Action Creators
const createUser = user => ({
  type: CREATE_USER,
  user
})

//Thunks
//send new user to api/users/
export const createNewUser = user => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/users', user);
    dispatch(createUser(data))
  }
}

//Reducer
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return [...state, action.user];
    default:
      return state;
  }
}

export default usersReducer
