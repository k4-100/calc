import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdHelpCenter } from "react-icons/md";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Help from "./Help";

/**
 *
 * @returns Belt with Utilities
 */
const UtilityBelt: React.FC = () => {
  const [displayHelp, setDisplayHelp] = useState(false);
  let navigate = useNavigate();

  return (
    <>
      <div className="UtilityBelt d-flex">
        <Button
          className="px-3 my-1"
          onClick={() => navigate("../", { replace: true })}
        >
          <AiOutlineArrowLeft fontSize={"2rem"} />
        </Button>
        <SearchBar />
        <Button
          variant="outline-warning"
          className="my-1 ms-auto me-1 p-0"
          onClick={() => setDisplayHelp(!displayHelp)}
        >
          <MdHelpCenter fontSize={"40px"} />
        </Button>
      </div>
      {displayHelp && <Help handleXClick={() => setDisplayHelp(false)} />}
    </>
  );
};

export default UtilityBelt;
