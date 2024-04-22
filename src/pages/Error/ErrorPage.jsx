import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ErrorPage = ({ isAdmin }) => {
  return (
    <div className="error-page">
      <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 text-center shadow-xl">
          <h1 className="mb-4 text-4xl font-bold text-black">404</h1>
          <p className="text-gray-600">
            Oops! The page you are looking for could not be found.
          </p>
          {!isAdmin && (
            <Link
              to="/"
              className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              {" "}
              Go back to Home{" "}
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              {" "}
              Go back to Home{" "}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

ErrorPage.propTypes = {
  isAdmin: PropTypes.bool,
};
