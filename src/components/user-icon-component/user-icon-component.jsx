import { User } from "@nextui-org/react";

const UserIconComponent = () => {
  return (
    <User
      className=""
      name="Jane Doe"
      description="Product Designer"
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      }}
    />
  );
};

export default UserIconComponent;
