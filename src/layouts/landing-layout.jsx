import { Outlet } from "react-router-dom";
import AppNavbar from "../components/appNavbar/appNavbar";
import ReportIncident from "../pages/reportIncident/reportIncident";

const LandingLayout = () => {
  return (
    <div>
      <AppNavbar />
      <Outlet/>
    </div>
  );
};

export default LandingLayout;
