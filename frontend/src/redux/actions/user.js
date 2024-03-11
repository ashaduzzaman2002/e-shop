import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

// get user
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { dispatch }) => {
    try {
      dispatch({ type: "GET_USER_REQUEST" });
      const { data } = await axiosInstance.get("/user/me");
      return data.user;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Internal Server Error";
      throw new Error(errorMessage);
    }
  }
);
