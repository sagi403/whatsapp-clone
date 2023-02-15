const generateAvatar = () => {
  const avatar = [];

  for (let i = 0; i < 5; i++) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    avatar.push(randomColor);
  }

  return avatar;
};

export default generateAvatar;
