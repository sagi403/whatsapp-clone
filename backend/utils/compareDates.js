const compareDates = date => {
  const today = new Date();
  const yesterday = new Date(Date.now() - 86400000).getDate();

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth();
  const dateDay = date.getDate();

  if (
    todayYear === dateYear &&
    todayMonth === dateMonth &&
    todayDay === dateDay
  ) {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (
    todayYear === dateYear &&
    todayMonth === dateMonth &&
    dateDay === yesterday
  ) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-GB");
  }
};

export default compareDates;
