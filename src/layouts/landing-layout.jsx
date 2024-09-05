import { Outlet } from "react-router-dom";
import AppNavbar from "../components/appNavbar/appNavbar";
import CreateProfile from "../pages/createProfile/createProfile";

const LandingLayout = ({setCreateProfileModal, createProfileModal, contractInstance, signer}) => {
  return (
    <div>
      <AppNavbar setCreateProfileModal={setCreateProfileModal} createProfileModal={createProfileModal}/>
      <CreateProfile setCreateProfileModal={setCreateProfileModal} createProfileModal={createProfileModal} contractInstance={contractInstance} signer={signer}/>
      <Outlet/>
    </div>
  );
};

export default LandingLayout;
