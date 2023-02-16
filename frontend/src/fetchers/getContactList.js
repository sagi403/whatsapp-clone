import axios from "axios";

export const getContactList = async () => {
  try {
    const { data } = await axios.get("/api/rooms");
    return data.contacts;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};
