import AppNavbar from "../components/appNavbar/appNavbar";

const LandingLayout = ({ children }) => {
  return (
    <div>
      <AppNavbar />
      {children}
    </div>
  );
};

export default LandingLayout;
