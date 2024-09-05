import React from "react";

const LandingLayout = ({ children }) => {
  return <div>
    <AppNavbar
    {children}
    </div>;
};

export default LandingLayout;
