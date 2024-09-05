import { Outlet } from 'react-router-dom';
import AppNavbar from '../components/appNavbar/appNavbar';

const LandingLayout = () => {
    return (
        <div>
            <AppNavbar />
            <Outlet />
        </div>
    );
};

export default LandingLayout;
