import React from "react";
import Header from "./Header";

/**
 *
 * @returns Home page
 */
const Home: React.FC = () => {
  return (
    <>
      <Header />
      <h1
        className="text-center w-75 text-dark"
        // style={{ marginTop: "6rem", fontSize: "4rem" }}
      >
        Welcome to SHEET!
      </h1>
      <p className="text-center w-100 h1 mt-3 font-weight-light text-secondary">
        Lorem ipsum dolor sit amet.
      </p>
      <div className="bg-dark py-1 w-25 mr-3 mt-3"></div>

      <img
        src="https://picsum.photos/id/20/500/500"
        alt="placeholder"
        className="d-block rounded  me-3 mt-5"
        // style={{
        //   marginLeft: "auto",
        // }}
      />
      <hr
      // style={{
      //   borderTop: "2px dashed black",
      // }}
      />
    </>
  );
};

export default Home;
