import './Loader.css';
const Loader = () => {
    return (
        <>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="overlay"></div>
        </>
    );
};

export default Loader;
