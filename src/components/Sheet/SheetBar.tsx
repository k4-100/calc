import React from "react";
import { useGlobalContext } from "../../context";
import SheetBarButton from "./SheetBarButton";

const SheetBar = () => {
  const { sheet } = useGlobalContext();
  return (
    <div className="SheetBar">
      <div className="d-flex">
        <div className="d-flex">
          {sheet.tables.length &&
            sheet.tables.map((_, i) => <SheetBarButton key={i} />)}
          {/* <SheetBarButton /> */}
        </div>
        <button type="button" className="btn btn-success ms-auto me-2">
          +
        </button>
      </div>
    </div>
  );
};

export default SheetBar;
