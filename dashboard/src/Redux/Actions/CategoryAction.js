import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
//   PRODUCT_DELETE_FAIL,
//   PRODUCT_DELETE_REQUEST,
//   PRODUCT_DELETE_SUCCESS,
//   PRODUCT_EDIT_FAIL,
//   PRODUCT_EDIT_REQUEST,
//   PRODUCT_EDIT_SUCCESS,
//   PRODUCT_LIST_FAIL,
//   PRODUCT_LIST_REQUEST,
//   PRODUCT_LIST_SUCCESS,
//   PRODUCT_UPDATE_FAIL,
//   PRODUCT_UPDATE_REQUEST,
//   PRODUCT_UPDATE_SUCCESS,
} from "../Constants/ProductConstants";
import axios from "axios";
import { logout } from "./userActions";
export const createCategory =
  (categoryName) =>
  async (dispatch, getState) => {
    
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/products/`,
        { categoryName },
        config
      );

      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      });
    }
  };
