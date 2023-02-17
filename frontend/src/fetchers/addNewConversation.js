import axios from "axios";

export const addNewConversation = async id => {
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const { data } = await axios.post("/api/rooms", { receiverId: id }, config);
    return data;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};
