import React, { useState, useEffect } from "react";

import Tilt from "react-tilt";

const DataBlock = (props) => {
  const { children, tilts } = props;
  const [blockClass, setBlockClass] = useState("");
  const tiltOptions = {
    scale: tilts ? 1.05 : 1,
    perspective: 2000,
    max: tilts ? 10 : 0,
  };


  return (
    <>
      {tilts ? (
        <Tilt className="Tilt" options={tiltOptions}>
          <div className={`data-block ${blockClass}`}>{children}</div>
        </Tilt>
      ) : (
        <div className="Tilt">
          <div className={`data-block ${blockClass}`}>{children}</div>
        </div>
      )}
    </>
  );
};

export default DataBlock;
