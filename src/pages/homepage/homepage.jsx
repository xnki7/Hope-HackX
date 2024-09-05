import Carousel from '../../components/carousel/carousel.jsx';
import { useEffect } from 'react';

function Homepage() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return <Carousel/>;
}

export default Homepage
