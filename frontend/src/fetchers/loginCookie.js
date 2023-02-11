import axios from "axios";

export const fetchCookie = async user => {
  const { email, password } = user;

  try {
    await axios.post("/api/users/login", {
      email,
      password,
    });
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};
