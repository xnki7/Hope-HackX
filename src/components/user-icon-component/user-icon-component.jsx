import { User } from "@nextui-org/react";

const UserIconComponent = ({username, img}) => {
  return (
    <User
      className=""
      name={username}
      description="Creator"
      avatarProps={{
        src: `https://ipfs.io/ipfs/${img}`,
      }}
    />
  );
};

export default UserIconComponent;
