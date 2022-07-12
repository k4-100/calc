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

  const handleDelClick = (id: string) => {
    const _sheet = _.cloneDeep(sheet);
    const deleteIndex = _sheet.tables.findIndex((tab) => tab.id === id);
    _sheet.tables.splice(deleteIndex, 1);
    setSheet!(_sheet);
  };

  return (
    <div className="SheetBarButton h-100 mx-2">
      <button className="btn btn-primary px-5 rounded-0">{name}</button>
      <button
        className="btn btn-danger  rounded-0"
        onClick={() => handleDelClick(id)}
      >
        X
      </button>
    </div>
  );
};

export default SheetBarButton;
