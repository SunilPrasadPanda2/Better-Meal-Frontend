import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
const Header = ({ title, buttons, breadcrumbs }) => {
  return (
    <div className="row">
      <div className="col-xl-9 col-md-6">
        <h5 className="mb-0">{title}</h5>
        <nav aria-label="breadcrumb" className="d-inline-block mt-2">
          <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            {breadcrumbs &&
              breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="breadcrumb-item">
                  <Link to={breadcrumb.link}>{breadcrumb.text}</Link>
                </li>
              ))}
            <li className="breadcrumb-item active" aria-current="page">
              {title}
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
      {buttons &&
        buttons.map((button, index) => (
          <Link key={index} to={button.link} className="btn btn-secondary">
            {button.text.startsWith('Add') && <MdAdd className="me-0 fs-4" />} {/* Render Add icon if text starts with "Add" */}
            {button.text.startsWith('Edit') && <MdEditNote className="me-0 fs-4"/>} {/* Render Edit icon if text starts with "Edit" */}
            {button.text}
          </Link>
        ))}
    </div>
    </div>
  );
};

export default Header;
