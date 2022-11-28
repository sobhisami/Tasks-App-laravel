import { useRef } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthApiController from "../../controller/auth-api-controller";
import { AuthContext } from "../../cotntext/auth-context";
import SocialMediaBar from "../SocialMediaBar";

const RegisterTab = () => {
  let navigate = useNavigate();
  let authContext = useContext(AuthContext);
  let authController = new AuthApiController();

  // Refs
  let nameRef = useRef();
  let userNameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();
  let repeatPasswordRef = useRef();

  let registerHandler = async (event) => {
    event.preventDefault();
    if (checkData()) {
      await register();
    }
  };

  let checkData = () => {
    if (
      emailRef.current.value != "" &&
      passwordRef.current.value != "" &&
      repeatPasswordRef.current.value != ""
    ) {
      if (passwordRef.current.value == repeatPasswordRef.current.value) {
        return true;
      }
      alert("Password confirmation error!");
      return false;
    }
    alert("Enter registration data");
    return false;
  };

  let register = async () => {
    // await authController.getCSRF();
    let result = await authController.performRegister(
      nameRef.current.value,
      userNameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
    console.log(result);
    alert(result.message);

    if (result.status) {
      clear();
    } else {
    }
  };

  let clear = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    userNameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div
      className="tab-pane fade"
      id="pills-register"
      role="tabpanel"
      aria-labelledby="tab-register"
    >
      <form onSubmit={registerHandler}>
        <SocialMediaBar />

        <h4 className="mb-4 mt-5 text-center">or:</h4>

        <div className="form-outline mb-4">
          <input
            type="text"
            id="registerName"
            className="form-control"
            placeholder="Name"
            ref={nameRef}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            id="registerUserName"
            className="form-control"
            placeholder="Username"
            ref={userNameRef}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="email"
            id="registerEmail"
            className="form-control"
            placeholder="Email"
            ref={emailRef}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="registerPassword"
            className="form-control"
            placeholder="password"
            ref={passwordRef}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="registerRepeatPassword"
            className="form-control"
            placeholder="repeat password"
            ref={repeatPasswordRef}
          />
        </div>

        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="registerCheck"
            defaultChecked
            aria-describedby="registerCheckHelpText"
          />
          <label className="form-check-label" htmlFor="registerCheck">
            I have read and agree to the terms
          </label>
        </div>

        <button type="submit" className="btn btn-main btn-block mb-3">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default RegisterTab;
