import React, { useEffect ,useState} from "react";
import contractInstance from "./loadChain"
import { ethers } from "ethers";

const [profile, setProfile] = useState(null)
const [isProfileCreated, setIsProfileCreated] = useState(false)
const [userName, setUserName] = useState("");
const [image, setImage] = useState(null);

const getIsProfileCreated = async () => {
    const tx = await contractInstance.getIsProfileCreated();
    setIsProfileCreated(tx);
  };

const uploadImg = async () => {
    const formData = new FormData();
    formData.append("file", image);
    const imageUploadResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "a0581626ef317ae1e2a7",
            pinata_secret_api_key:
              "d45a17aa6f602613d4c21f7f4076ad4a077c9eebdc23b169fa33f845d89dff82",
          },
        }
    );
    return(imageUploadResponse.data.IpfsHash)
}

const createProfile = async () => {
    const imgCid = await uploadImg()
    const tx = await contract.createProfile(
        userName,
        imageUploadResponse.data.IpfsHash
    );
    await tx.wait();
}

const uploadForm = async()=>{

}

