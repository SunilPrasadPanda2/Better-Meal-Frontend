import { Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <div className="text-center">
      <Spinner
        className="text-current"
        animation="grow"
        size="sm"
        role="status"
      >
      </Spinner>
        <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Loader;
