import { UPLOAD_FAIL, UPLOAD_REQUEST, UPLOAD_SUCCESS } from "../constants/uploadConstants";

export const uploadReducer = (state = {}, action) => {
    switch (action.type) {
      case UPLOAD_REQUEST:
        return { loading: false };
      case UPLOAD_SUCCESS:
        return { loading: false, file: action.payload };
      case UPLOAD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };