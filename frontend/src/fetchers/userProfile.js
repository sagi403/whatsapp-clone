import axios from "axios";

export const fetchProfile = async () => {
  try {
    const { data } = await axios.get("/api/users/profile");
    return data;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};
