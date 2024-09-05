import { useState, useEffect } from 'react';
import img1 from '../../assets/img1.webp';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.webp';
import img4 from '../../assets/img4.webp';
import img5 from '../../assets/img5.jpg';

const Carousel = () => {
    const slidesData = [
        {
            img: img1,
            bgColor: 'bg-white',
        },
        {
            img: img2,
            bgColor: 'bg-white',
        },
        {
            img: img3,
            bgColor: 'bg-white',
        },
        {
            img: img4,
            bgColor: 'bg-white',
        },
        {
            img: img5,
            bgColor: 'bg-white',
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide();
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentSlide]);

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
            <Slide
                img={slidesData[currentSlide].img}
                bgColor={slidesData[currentSlide].bgColor}
                text={slidesData[currentSlide].text}
            />
        </div>
    );
};

const Slide = ({ img, bgColor, text }) => {
    return (
        <div
            className={`${bgColor} w-full h-full flex flex-col justify-center items-center md:flex-row text-black pb-20`}
            style={{ transition: 'background-color 0.5s ease' }}
        >
            <div className="w-full h-full flex justify-center items-center">
                <img
                    src={img}
                    alt="Slide"
                    className="object-cover w-[90%] h-[50%] rounded-lg shadow-lg"
                />
            </div>
            <div className="m-auto h-[50%] pt-2 w-[95%] px-[5%] text-center flex flex-col justify-between md:text-left">
                <div className="font-bold text-3xl mb-3 text-center md:text-left md:text-4xl">
                Make a Difference Today!
                </div>
                <div className="font-bold text-2xl mb-3 text-center md:text-left">
                    Join <span className="text-[#229799] text-3xl">“Hope”</span> and be
                    the change the world needs.
                </div>

                <p className="text-lg md:text-xl">
                    Whether you're here to lend a helping hand or seeking
                    support, your actions matter. Start a campaign, donate, or
                    share a cause—every step brings us closer to a brighter
                    future. Together, we can create lasting impact. Get involved
                    now!
                </p>
                <div className="text-white rounded bg-slate-950 w-max mx-auto py-2 px-4 mt-5 md:ml-0">
                    Explore
                </div>
            </div>
        </div>
    );
};

export default Carousel;
