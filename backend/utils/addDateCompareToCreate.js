import compareDates from "./compareDates.js";

const addDateCompareToCreate = array => {
  return array.map(msg => {
    const { receiverId, text, time, id } = msg;
    return { receiverId, text, time, id, date: compareDates(msg.date) };
  });
};

export default addDateCompareToCreate;
