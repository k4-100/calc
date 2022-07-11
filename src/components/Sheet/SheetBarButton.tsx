import React from "react";
// import MdCancel from 'md'
/**
 *
 * @returns SheetBarButton
 */
const SheetBarButton: React.FC = () => {
  return (
    <div className="SheetBarButton">
      <button className="btn btn-primary">1</button>
      <button className="btn btn-danger">X</button>
    </div>
  );
};

export default SheetBarButton;
