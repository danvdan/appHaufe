import * as actionTypes from "./actions";

const initialState = {
  credentials: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CREDENTIALS:
      return {
        ...state,
        credentials: action.credentials
      };
    default:
      return state;
  }
};

export default reducer;
