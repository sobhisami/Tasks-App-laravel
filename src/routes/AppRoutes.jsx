import { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import NewTask from "../components/NewTask";
import TaskDetails from "../components/TaskDetails";
import Tasks from "../components/Tasks";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => {
  let loggedIn = useSelector((state) => state.authReducer.loggedIn);
  return (
    <Routes>
        <Route
        path="/"
        element={loggedIn ? <Navigate to="/dashboard/tasks" /> : <LoginPage />}
      />
      <Route
        path="/login"
        element={loggedIn ? <Navigate to="/dashboard/tasks" /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
      >
        <Route path="/dashboard/tasks" element={<Tasks />} />
        <Route path="/dashboard/new-task" element={<NewTask />} />
        <Route path="/dashboard/tasks/:id/details" element={<TaskDetails />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
