import axios from "axios";

export const getMessages = async id => {
  try {
    const { data } = await axios.get(`/api/messages/${id}`);

    return data.messages;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};
