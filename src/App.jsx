import { Route, Routes } from "react-router-dom";
import LandingLayout from "./layouts/landing-layout.jsx";
import CampaignsPage from "./pages/campaigns-page.jsx";
import Homepage from "./pages/homepage/homepage.jsx";
import ReportIncident from "./pages/reportIncident/reportIncident.jsx"
import CreateProfile from "./pages/createProfile/createProfile.jsx";
import { useState } from "react";
function App() {
  const [createProfileModal, setCreateProfileModal] = useState(false);
  return (
    <Routes>
      <Route element={<LandingLayout setCreateProfileModal={setCreateProfileModal} createProfileModal={createProfileModal} />} path="/">
        <Route element={<Homepage />} path="/home" />
        <Route element={<CampaignsPage />} path="/campaigns" />
        <Route element={<ReportIncident />} path="/reportIncident" />
        <Route element={<CreateProfile createProfileModal={createProfileModal} setCreateProfileModal={setCreateProfileModal}/>} path="/createProfile" />
      </Route>
    </Routes>
  );
}

export default App;
