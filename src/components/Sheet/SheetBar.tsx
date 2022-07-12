import React from "react";
import { useGlobalContext } from "../../context";
import SheetBarButton from "./SheetBarButton";
import _ from "lodash";
import { TableClass } from "../../utility/Classes";

const SheetBar = () => {
  const { sheet, setSheet } = useGlobalContext();

  /**
   * adds new table into sheet
   */
  const handleTableAdd = () => {
    const _sheet = _.cloneDeep(sheet);
    _sheet.tables.push(new TableClass(3, 4));
    setSheet!(_sheet);
  };
  return (
    <div className="SheetBar">
      <div className="d-flex">
        <div className="d-flex">
          {sheet.tables.length &&
            sheet.tables.map((_, i) => (
              <SheetBarButton name={`${i + 1}`} key={i} />
            ))}
        </div>
        <button
          type="button"
          className="btn btn-success ms-auto me-2"
          onClick={() => handleTableAdd()}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SheetBar;
