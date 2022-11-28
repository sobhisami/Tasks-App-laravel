import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../cotntext/auth-context";

const Nav = () => {
  let authContext = useContext(AuthContext);

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              to="/dashboard/tasks"
              className={(props) =>
                props.isActive ? "nav-link active" : "nav-link"
              }
              aria-current="page"
              end
            >
              <span data-feather="home"></span>
              Tasks
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/dashboard/new-task"
              className={(props) =>
                props.isActive ? "nav-link active" : "nav-link"
              }
            >
              <span data-feather="file"></span>
              New Task
            </NavLink>
          </li>
          {/* <li  className="nav-item">
            <a  className="nav-link" href="#">
              <span data-feather="users"></span>
              other link
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};
export default Nav;
