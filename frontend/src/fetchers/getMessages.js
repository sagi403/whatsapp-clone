import axios from "axios";

export const getMessages = async id => {
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const { data } = await axios.post(
      "/api/rooms/messages",
      { receiverId: id },
      config
    );

    return data.messages;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};
