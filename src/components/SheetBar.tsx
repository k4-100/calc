import React from "react";

const SheetBar = () => {
  return (
    <div className="SheetBar">
      <div className="d-flex mx-1">
        <div className="d-flex w-100 my-1">
          <button
            type="button"
            style={{ borderRadius: "0" }}
            className="btn btn-primary w-100 mx-1"
          >
            1
          </button>
          <button
            type="button"
            style={{ borderRadius: "0" }}
            className="btn btn-primary w-100 mx-1"
          >
            1
          </button>
          <button
            type="button"
            style={{ borderRadius: "0" }}
            className="btn btn-primary w-100 mx-1"
          >
            1
          </button>
          <button
            type="button"
            style={{ borderRadius: "0" }}
            className="btn btn-primary w-100 mx-1"
          >
            1
          </button>
        </div>
        <button
          type="button"
          style={{ borderRadius: "0", width: "50px" }}
          className="btn btn-success"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SheetBar;
