import compareDatesOnly from "./compareDatesOnly.js";

const addDateCompareToCreate = array => {
  return array.map(msg => {
    const { receiverId, text, time, id } = msg;
    return { receiverId, text, time, id, date: compareDatesOnly(msg.date) };
  });
};

export default addDateCompareToCreate;
