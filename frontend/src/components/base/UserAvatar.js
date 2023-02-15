import Avatar from "boring-avatars";

const UserAvatar = ({ name, colors }) => {
  return (
    <span className="mx-2">
      <Avatar size={40} name={name} variant="marble" colors={colors} />
    </span>
  );
};

export default UserAvatar;
