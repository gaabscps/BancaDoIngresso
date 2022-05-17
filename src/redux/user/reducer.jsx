import { ADD_USER } from "../actionTypes";

const initial_state = {
  user: {},
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: { ...action.payload } };
    default:
      return { ...state };
  }
};
