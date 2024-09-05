import { useEffect, useState } from "react";
import ImageInputBox from "../../components/imageInputBox/imageInputBox.jsx";
import crossImg from "../../../public/crossImg.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from 'ethers';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const CreateProfile = ({ setCreateProfileModal, createProfileModal, contractInstance }) => {

  const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
const [profile, setProfile] = useState(null)
const [isProfileCreated, setIsProfileCreated] = useState(false)
const [userName, setUserName] = useState("");
const [image, setImage] = useState(null);
const [imageCid, setImageCid] = useState(null);

const getIsProfileCreated = async () => {
    const tx = await contractInstance.getIsProfileCreated();
    setIsProfileCreated(tx);
  };

const uploadImg = async () => {
    const formData = new FormData();
    formData.append("file", image);
    const imageUploadResponse = await axios.post(
                'https://api.pinata.cloud/pinning/pinFileToIPFS',
                formData,
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhZmE1ODhiMS02M2YzLTQ0YTQtOTI0NS1lYmEzZWJhNzU0MzUiLCJlbWFpbCI6InNhbWVlcm1hZGhhdi41QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMzc0ZDM4YzQ2YmJmYzIxMTc1MSIsInNjb3BlZEtleVNlY3JldCI6ImFlMzgwNzllNWIyMjY5NDJlYzFhN2I0MWZmODc2YWFhYTE3Y2YzZDRiNTE5N2E4ZTZjNjEyNzA0NWMxODRkMWUiLCJleHAiOjE3NTcwOTMyODB9.IKcDXZ1B6OwgRFOsBrG_ixi39HSVl05EaW8dP87EDec`,
                    },
                }
            );
    setImageCid(imageUploadResponse.data.IpfsHash)
    console.log(imageUploadResponse.data.IpfsHash);
    
}

const createProfile = async () => {
  const formData = new FormData();
    formData.append("file", image);
    const imageUploadResponse = await axios.post(
                'https://api.pinata.cloud/pinning/pinFileToIPFS',
                formData,
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhZmE1ODhiMS02M2YzLTQ0YTQtOTI0NS1lYmEzZWJhNzU0MzUiLCJlbWFpbCI6InNhbWVlcm1hZGhhdi41QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMzc0ZDM4YzQ2YmJmYzIxMTc1MSIsInNjb3BlZEtleVNlY3JldCI6ImFlMzgwNzllNWIyMjY5NDJlYzFhN2I0MWZmODc2YWFhYTE3Y2YzZDRiNTE5N2E4ZTZjNjEyNzA0NWMxODRkMWUiLCJleHAiOjE3NTcwOTMyODB9.IKcDXZ1B6OwgRFOsBrG_ixi39HSVl05EaW8dP87EDec`,
                    },
                }
            );
    setImageCid(imageUploadResponse.data.IpfsHash)
    console.log(imageUploadResponse.data.IpfsHash);
    const tx = await contractInstance.createProfile(
        userName,
        imageUploadResponse.data.IpfsHash
    );
    await tx.wait();
    alert("Profile created ✅");
  }

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

  return (
    <>
      {createProfileModal ? (
        <form onSubmit={handleSubmit(createProfile)}>
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
                  <ImageInputBox name="image" onChange={(e)=>{setImage(e.target.value)}} />
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
                      onChange={(e)=>{setUserName(e.target.value)}}
                      name="userName"
                      required
                    />
                  </div>
                  <div>
                    <div className="text-black font-medium mb-1">Bio:</div>
                    <textarea
                      className="rounded-lg w-[100%] sm:w-[15rem] px-2 py-2 bg-gray-300 text-black placeholder:text-sm placeholder:text-gray-600 text-sm"
                      placeholder="About you ..."
                      name="bio"
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
