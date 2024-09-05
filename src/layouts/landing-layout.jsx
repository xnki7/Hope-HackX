import { Outlet } from "react-router-dom";
import AppNavbar from "../components/appNavbar/appNavbar";

const LandingLayout = ({setCreateProfileModal, createProfileModal}) => {
  return (
    <div>
      <AppNavbar setCreateProfileModal={setCreateProfileModal} createProfileModal={createProfileModal}/>
      <Outlet/>
    </div>
  );
};

export default LandingLayout;
