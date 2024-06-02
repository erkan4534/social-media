import { useState } from "react";
import PropTypes from "prop-types";

const FileUpload = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    uploadToCloudinary(file);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "social-media"); // Cloudinary'de oluşturduğunuz upload preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwjtgwgok/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageURL(data.secure_url); // Cloudinary'den gelen güvenli URL
      onFileUpload(data.secure_url); // URL'yi geri döndür
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {/* {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <p>File Preview:</p>
          <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
        </div>
      )} */}
      {imageURL && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageURL} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default FileUpload;
