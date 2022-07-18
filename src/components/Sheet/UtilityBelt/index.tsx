import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

/**
 *
 * @returns Belt with Utilities
 */
const UtilityBelt: React.FC = () => {
  let navigate = useNavigate();
  return (
    <div className="UtilityBelt d-flex">
      <Button
        className="px-3 my-1"
        onClick={() => navigate("../", { replace: true })}
      >
        <AiOutlineArrowLeft fontSize={"2rem"} />
      </Button>
      <SearchBar />
    </div>
  );
};

export default UtilityBelt;
