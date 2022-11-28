import { NavLink } from "react-router-dom";

const Task = (props) => {
  return (
    <div className="col-md-4">
      <div className="card task card">
        <img src={props.task.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.task.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            <span data-feather="calendar"></span> {props.task.startDate}
            <span className="main-color"> To </span> {props.task.endDate}
          </h6>
          <p className="card-text">{props.task.details}</p>
          <hr />
          <span className="btn badge-light-warning status-btn Wating">
            {props.task.status}
          </span>

          <NavLink
            to={`/dashboard/tasks/${props.task.id}/details`}
            className="btn btn-bg-gray pull-right"
          >
            <span data-feather="arrow-right"></span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Task;
