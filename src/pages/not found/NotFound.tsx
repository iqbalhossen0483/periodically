import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-conainer">
      <p>404, Page not found</p>
      <p>
        Please <Link to="/">Go backe</Link>
      </p>
    </div>
  );
};

export default NotFound;
