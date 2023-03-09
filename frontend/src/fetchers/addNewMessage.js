import axios from "axios";

export const addNewMessage = async messages => {
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const { data } = await axios.post("/api/messages", messages, config);

    return data.message;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};
