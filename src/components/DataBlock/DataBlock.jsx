import React, { useState, useEffect } from "react";

import Tilt from "react-tilt";

const DataBlock = (props) => {
  const { children, tilts, isPlayer } = props;
  const tiltOptions = {
    scale: tilts ? 1.05 : 1,
    perspective: 2000,
    max: tilts ? 10 : 0,
  };

  const blockClass = isPlayer ? "" : "non-player";
  return (
    <>
      {tilts ? (
        <Tilt className="Tilt" options={tiltOptions}>
          <div className={`data-block ${blockClass}`}>{children}</div>
        </Tilt>
      ) : (
        <div className="Tilt block-div">
          <div className={`data-block ${blockClass}`}>{children}</div>
        </div>
      )}
    </>
  );
};

export default DataBlock;
