import axios from "axios";

export const loginUser = async user => {
  const { email, password } = user;

  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    return data;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};
