import {
  faFacebookF,
  faGithub,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SocialMediaBar = () => {
  return (
    <div className="text-center mb-3">
      <h4 className="mb-4 mt-5">Login To Momen Task System With</h4>
      <button type="button" className="btn btn-link btn-floating mx-1">
        {/* <i className="fab fa-facebook-f"></i> */}
        <FontAwesomeIcon icon={faFacebookF} />
      </button>

      <button type="button" className="btn btn-link btn-floating mx-1">
        {/* <i className="fab fa-google"></i> */}
        <FontAwesomeIcon icon={faGoogle} />
      </button>

      <button type="button" className="btn btn-link btn-floating mx-1">
        {/* <i className="fab fa-twitter"></i> */}
        <FontAwesomeIcon icon={faTwitter} />
      </button>

      <button type="button" className="btn btn-link btn-floating mx-1">
        {/* <i className="fab fa-github"></i> */}
        <FontAwesomeIcon icon={faGithub} />
      </button>
    </div>
  );
};
export default SocialMediaBar;
