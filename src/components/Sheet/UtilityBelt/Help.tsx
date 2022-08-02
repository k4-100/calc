import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { ImCross } from "react-icons/im";

interface Props {
  handleXClick: () => void;
}

const Help = ({ handleXClick }: Props) => {
  return (
    <div className="Help w-100 h-100 position-fixed top-0">
      <div className="container  bg-dark h-75 my-5 d-block">
        <div className="d-flex justify-content-between p-2 py-3">
          <h1 className="text-light">How to Guide: </h1>
          <Button onClick={handleXClick}>
            <ImCross />
          </Button>
        </div>

        <ListGroup className="px-2 ">
          <ListGroup.Item>
            To change text, click twice on a cell and start typing, and save by
            clicking Enter/clicking somewhere else.
          </ListGroup.Item>
          <ListGroup.Item>
            To perform calculation, begin by typing `=`, for example: =10-5
          </ListGroup.Item>
          <ListGroup.Item>
            You can access cell for use in mathematical expression by its "name"
            (for example: A1, B3, C2), by typing `=` before it (like: =A2, =B3).
          </ListGroup.Item>
          <ListGroup.Item>
            Exit this menu by pressing X in a top-right corner.{" "}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export default Help;
