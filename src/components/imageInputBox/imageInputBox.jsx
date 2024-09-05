import { useState } from "react";

const ImageInputBox = ({ onChange, name, isRequired }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onChange({
          target: {
            name: name,
            value: file,
          },
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
      onChange({
        target: {
          name: name,
          value: null,
        },
      });
    }
  };

  const removeImage = () => {
    setImagePreview("");
    onChange({
      target: {
        name: name,
        value: null,
      },
    });
  };

  return (
    <div className="flex flex-col">
      <div
        className="w-[100%] h-[13rem] bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {imagePreview ? (
          <>
            <img
              src={imagePreview}
              alt="Preview"
              className="object-contain max-w-[15rem] max-h-[12rem]"
            />
            {isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <label className="text-white text-sm cursor-pointer">
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    name={name}
                  />
                </label>
              </div>
            )}
          </>
        ) : (
          <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              name={name}
            />
            <span className="text-gray-600 text-sm">
              Click to select an image
            </span>
          </label>
        )}
      </div>
      {imagePreview && (
        <button
          onClick={removeImage}
          className="mt-2 text-sm text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out"
        >
          Remove Image
        </button>
      )}
      {isRequired && !imagePreview && (
        <p className="text-red-500 text-sm mt-2">Image is required.</p>
      )}
    </div>
  );
};

export default ImageInputBox;
