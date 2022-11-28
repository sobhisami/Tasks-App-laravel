import { useEffect, useRef } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import AuthApiController from "../controller/auth-api-controller";
import CategoriesApiController from "../controller/categories-api-controller";
import { authActions } from "../redux/slices/auth-slice";
import { categoriesActions } from "../redux/slices/categories-slice";
import { tasksActions } from "../redux/slices/tasks-slice";

const Dashboard = () => {
  let searchRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let userInfo = useSelector((state) => state.authReducer.user);
  let categories = useSelector((state) => state.categoryReducer.categories);

  let authController = new AuthApiController();
  let categoriesApiController = new CategoriesApiController();

  let onSearchTextChangeHandler = (event) => {
    console.log(event.target.value);
    dispatch(tasksActions.filterTasksByName(event.target.value));
  };

  let signoutHandler = async () => {
    let response = await authController.logout();
    if (response.status) {
      dispatch(authActions.setLoggedIn(false));
      navigate("/login", { replace: true });
    }
  };

  let fetchUserInfo = async () => {
    let response = await authController.userInfo();
    if (response.status) {
      console.log(response.user);
      dispatch(authActions.setUserInfo(response.user));
    }
  };

  let fetchCategories = async () => {
    if (categories.length == 0) {
      let categories = await categoriesApiController.fetchCategories();
      if (categories.length != 0) {
        dispatch(categoriesActions.setCategories(categories));
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchCategories();
  }, []);

  return (
    <Fragment>
      <header className="navbar sticky-top navbar-light bg-light flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          {userInfo.name}
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
          ref={searchRef}
          onChange={onSearchTextChangeHandler}
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <button
              className="nav-link px-3 btn-light-main btn"
              onClick={signoutHandler}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <Nav />
          {/* <Tasks /> */}
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};
export default Dashboard;
