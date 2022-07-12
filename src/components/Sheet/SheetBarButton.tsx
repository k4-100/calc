import React from "react";

/**
 *
 * @returns SheetBarButton
 */
const SheetBarButton: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="SheetBarButton h-100 mx-2">
      <button className="btn btn-primary px-5 rounded-0">{name}</button>
      <button className="btn btn-danger  rounded-0">X</button>
    </div>
  );
};

export default SheetBarButton;
