import { IS_LOADING } from "../actionTypes";

const initial_state = {
  loading: false,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return { ...state };
  }
};
