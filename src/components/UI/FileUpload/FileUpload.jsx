import PropTypes from "prop-types";
import "./FileUpload.css";

const FileUpload = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileSelect(file);
  };

  return (
    <div>
      <label htmlFor="file-upload" className="custom-file-upload">
        File Upload
      </label>
      <input id="file-upload" type="file" onChange={handleFileChange} />
    </div>
  );
};

FileUpload.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
};

export default FileUpload;
