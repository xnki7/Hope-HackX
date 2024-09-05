import { Route, Routes } from "react-router-dom";
import LandingLayout from "./layouts/landing-layout.jsx";
import Homepage from "./pages/homepage.jsx";
import CampaignsPage from "./pages/campaigns-page.jsx";
function App() {
  return (
    <Routes>
      <Route element={<LandingLayout />} path="/">
        <Route element={<Homepage />} path="/home" />
        <Route element={<CampaignsPage />} path="/campaigns" />
      </Route>
    </Routes>
  );
}

export default App;
