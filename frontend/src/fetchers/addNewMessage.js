import axios from "axios";

export const addNewMessage = async msg => {
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const { data } = await axios.post("/api/rooms/message", msg, config);

    return data.message;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};
