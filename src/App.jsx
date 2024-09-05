import { Route, Routes } from "react-router-dom";
import LandingLayout from "./layouts/landing-layout.jsx";
import Homepage from "./pages/homepage.jsx";
import ReportIncident from "./pages/reportIncident/reportIncident.jsx"
function App() {
  return (
    <Routes>
      <Route element={<LandingLayout />} path="/">
        <Route element={<Homepage />} path="/home" />
        <Route element={<ReportIncident />} path="/reportIncident" />
      </Route>
    </Routes>
  );
}

export default App;
