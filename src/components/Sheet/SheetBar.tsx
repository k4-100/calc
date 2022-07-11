import React from "react";
import SheetBarButton from "./SheetBarButton";

const SheetBar = () => {
  return (
    <div className="SheetBar">
      <div className="d-flex">
        <div className="">
          <SheetBarButton />
          {/* <button
            type="button"
            style={{ borderRadius: "0" }}
            className="btn btn-primary w-100 mx-1"
          >
            1
          </button> */}
        </div>
        <button type="button" className="btn btn-success ms-auto me-2">
          +
        </button>
      </div>
    </div>
  );
};

export default SheetBar;
