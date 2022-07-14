import React from "react";
import _ from "lodash";
import { useGlobalContext } from "../../context";

/**
 *
 * @returns SheetBarButton
 */
const SheetBarButton: React.FC<{ name: string; id: string }> = ({
  name,
  id,
}) => {
  const { sheet, setSheet } = useGlobalContext();

  /**
   * deletes table from sheet
   * @param id id of table to be deleted
   */
  const handleDelClick = (id: string) => {
    const _sheet = _.cloneDeep(sheet);
    const deleteIndex = _sheet.tables.findIndex((tab) => tab.id === id);
    _sheet.tables.splice(deleteIndex, 1);
    // ensures there will be always a main tab
    if (_sheet.mainTabID === id) _sheet.mainTabID = _sheet.tables[0].id;
    setSheet!(_sheet);
  };
  /**
   * switches to another main table
   * @param id id of a new main table
   */
  const handleSwitchToNextTable = (id: string) => {
    const _sheet = _.cloneDeep(sheet);
    _sheet.mainTabID = id;
    setSheet!(_sheet);
  };

  return (
    <div className="SheetBarButton h-100 mx-2">
      <button
        className="btn btn-primary px-5 rounded-0"
        onClick={() => handleSwitchToNextTable(id)}
      >
        {name}
      </button>
      <button
        className="btn btn-danger  rounded-0"
        onClick={() => handleDelClick(id)}
        disabled={sheet.tables.length < 2}
      >
        X
      </button>
    </div>
  );
};

export default SheetBarButton;
