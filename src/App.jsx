import { Route, Routes } from 'react-router-dom';
import LandingLayout from './layouts/landing-layout.jsx';
import Homepage from './pages/homepage/homepage.jsx';
import CampaignsPage from './pages/campaigns-page/campaigns-page.jsx';
import ReportIncident from './pages/reportIncident/reportIncident.jsx';
import CampaignDetail from './pages/campaign-detail/campaign-detail.jsx';
function App() {
    return (
        <Routes>
            <Route element={<LandingLayout />} path="/">
                <Route element={<Homepage />} path="/home" />
                <Route element={<CampaignsPage />} path="/campaigns" />
                <Route element={<CampaignDetail />} path="/c/:campaignId" />
                <Route element={<ReportIncident />} path="/reportIncident" />
            </Route>
        </Routes>
    );
}

export default App;
