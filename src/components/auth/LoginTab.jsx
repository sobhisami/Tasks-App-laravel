import { useContext, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthApiController from "../../controller/auth-api-controller";
import { AuthContext } from "../../cotntext/auth-context";
import { authActions } from "../../redux/slices/auth-slice";
import SocialMediaBar from "../SocialMediaBar";

const LoginTab = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let authController = new AuthApiController();

  //Refs
  let emailRef = useRef();
  let passwordRef = useRef();

  let loginHandler = async (event) => {
    event.preventDefault();
    if (checkData()) {
      await login();
    }
  };

  let checkData = () => {
    if (emailRef.current.value != "" && passwordRef.current.value != "") {
      return true;
    }
    alert("Enter login credentials");
    return false;
  };

  let login = async () => {
    let result = await authController.performLogin(
      emailRef.current.value,
      passwordRef.current.value
    );
    if (result.status) {
      alert(result.message);
      localStorage.setItem("logged_in", true);
      dispatch(authActions.setLoggedIn(true));
      navigate("/dashboard/tasks");
    } else {
      console.log("Failed!");
      alert(result.message);
      //   new bootstrap.Toast("Login failed!", { delay: 500, autohide: true });
    }
  };

  return (
    <div
      className="tab-pane fade show active"
      id="pills-login"
      role="tabpanel"
      aria-labelledby="tab-login"
    >
      <form onSubmit={loginHandler}>
        <SocialMediaBar />

        <h4 className="mb-5 mt-2 text-center">or</h4>

        <div className="form-outline mb-4">
          <input
            type="email"
            id="loginName"
            className="form-control"
            placeholder="Email or username"
            ref={emailRef}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="loginPassword"
            className="form-control"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>

        <div className="row mb-4">
          <div className="col-md-6 d-flex justify-content-center">
            <div className="form-check mb-3 mb-md-0">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="loginCheck"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="loginCheck">
                Remember me
              </label>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="btn btn-main btn-block mb-4">
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <a href="#!">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};
export default LoginTab;
