import Carousel from '../../components/carousel/carousel.jsx';
import { useEffect } from 'react';

function Homepage() {
    useEffect(() => {
        // Disable scrolling on component mount
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling on component unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return <Carousel />;
}

export default Homepage;
