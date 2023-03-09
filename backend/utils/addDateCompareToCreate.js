import compareDates from "./compareDates.js";

const addDateCompareToCreate = array => {
  return array.map(msg => {
    const { receiverId, text, time } = msg;
    return { receiverId, text, time, date: compareDates(msg.date) };
  });
};

export default addDateCompareToCreate;
