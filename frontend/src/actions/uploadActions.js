import Axios from "axios";
import {
  UPLOAD_FAIL,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
} from "../constants/uploadConstants";

export const upload = (file) => async (dispatch, getState) => {
  dispatch({ type: UPLOAD_REQUEST, payload: file });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/uploads/pay", file, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: UPLOAD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPLOAD_FAIL, payload: message });
  }
};
