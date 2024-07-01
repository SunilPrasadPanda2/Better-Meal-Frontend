import React from "react";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function loading() {
  return (
    <>
      <style>
        {`
    @keyframes grow {
      0%, 30%, 70% {
        opacity: 0.5;
      }
      40%, 80% {
        opacity: 0;
      }
    }

    .spinner-grow-custom:nth-child(1) {
      animation: grow 2s infinite;
    }

    .spinner-grow-custom:nth-child(2) {
      animation: grow 2s infinite 0.05s;
    }

    .spinner-grow-custom:nth-child(3) {
      animation: grow 2s infinite 0.1s; 
    }

    .spinner-grow-custom:nth-child(4) {
      animation: grow 2s infinite 0.15s; 
    }

    .spinner-grow-custom:nth-child(5) {
      animation: grow 2s infinite 0.2s;
    }
  `}
      </style>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner
          animation="grow"
          role="status"
          className="spinner-grow-custom"
          style={{ width: "1rem", height: "1rem" }}
        >
          <span className="sr-only"></span>
        </Spinner>
        <Spinner
          animation="grow"
          role="status"
          className="spinner-grow-custom ms-2"
          style={{ width: "1rem", height: "1rem" }}
        >
          <span className="sr-only"></span>
        </Spinner>
        <Spinner
          animation="grow"
          role="status"
          className="spinner-grow-custom ms-2"
          style={{ width: "1rem", height: "1rem" }}
        >
          <span className="sr-only"></span>
        </Spinner>
        <Spinner
          animation="grow"
          role="status"
          className="spinner-grow-custom ms-2"
          style={{ width: "1rem", height: "1rem" }}
        >
          <span className="sr-only"></span>
        </Spinner>
        <Spinner
          animation="grow"
          role="status"
          className="spinner-grow-custom ms-2"
          style={{ width: "1rem", height: "1rem" }}
        >
          <span className="sr-only"></span>
        </Spinner>
      </div>
    </>
  );
}
