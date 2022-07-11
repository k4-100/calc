import React from "react";
// import MdCancel from 'md'
/**
 *
 * @returns SheetBarButton
 */
const SheetBarButton: React.FC = () => {
  return (
    <div className="SheetBarButton h-100 mx-2">
      <button className="btn btn-primary px-5 rounded-0">1</button>
      <button className="btn btn-danger  rounded-0">X</button>
    </div>
  );
};

export default SheetBarButton;
