import axios from "axios";

export const addUnreadToRead = async roomId => {
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const { data } = await axios.post(
      "/api/rooms/message/combine",
      roomId,
      config
    );

    return data.message;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};
