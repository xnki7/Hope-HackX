import { useEffect, useState } from "react";
import ImageInputBox from "../../components/imageInputBox/imageInputBox.jsx";
import crossImg from "../../../public/crossImg.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const CreateProfile = ({ setCreateProfileModal, createProfileModal }) => {
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    image: null,
    bio: "",
  });
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setProfileDetails((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setProfileDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {};

  return (
    <>
      {createProfileModal ? (
        <form onSubmit={handleSubmit}>
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
            <div className="bg-white w-[90%] sm:w-[40rem] m-auto rounded-lg p-5">
              <div className="flex justify-between items-start mt-3">
                <div>
                  <img
                    src={crossImg}
                    className="w-7 h-7 cursor-pointer"
                    alt=""
                    onClick={() => {
                      setCreateProfileModal(false);
                    }}
                  />
                </div>
                <div className="text-black font-semibold text-2xl text-center w-full">
                  Create Profile
                </div>
                <div></div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-7 my-9">
                <div className="w-[100%] sm:w-[13rem]">
                  <div className="text-black font-medium mb-1">
                    Profile picture:
                  </div>
                  <ImageInputBox name="image" onChange={handleChange} />
                </div>
                <div className="flex flex-col justify-between gap-5 max-sm:w-[100%]">
                  <div>
                    <div className="text-black font-medium mb-1">
                      Full name:
                    </div>
                    <input
                      type="text"
                      className="rounded-lg pl-2 py-2 text-black bg-gray-300 w-full placeholder:text-sm placeholder:text-gray-600 text-sm"
                      placeholder="John Doe"
                      onChange={handleChange}
                      name="name"
                      value={profileDetails.name}
                      required
                    />
                  </div>
                  <div>
                    <div className="text-black font-medium mb-1">Bio:</div>
                    <textarea
                      className="rounded-lg w-[100%] sm:w-[15rem] px-2 py-2 bg-gray-300 text-black placeholder:text-sm placeholder:text-gray-600 text-sm"
                      placeholder="About you ..."
                      onChange={handleChange}
                      name="bio"
                      value={profileDetails.bio}
                      required
                    ></textarea>
                  </div>
                  <div>
                    <ConnectButton />
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="text-black text-lg font-medium text-center mt-10 mb-2 w-max m-auto px-[2rem] py-[0.3rem] rounded-lg bg-primary cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <></>
      )}
    </>
  );
};

export default CreateProfile;
