import "./Dropdown.css";
import PropTypes from "prop-types";

function Dropdown({ user, options, isOpen, setIsOpen }) {
  const handleImageClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="custom-dropdown">
      <div className="custom-dropdown-header" onClick={handleImageClick}>
        <img
          src={user && user.profilePicture}
          className="profile-icon"
          alt="Profil"
        />
      </div>
      {isOpen && (
        <ul className="custom-dropdown-list">
          {options.map((option) => (
            <li
              key={option.value}
              className="custom-dropdown-item"
              onClick={option.action}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  user: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,

  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};
