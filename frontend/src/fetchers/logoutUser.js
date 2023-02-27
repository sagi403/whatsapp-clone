import axios from "axios";

export const logoutUser = async () => {
  try {
    const { data } = await axios.post("/api/users/logout");
    return data;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};
