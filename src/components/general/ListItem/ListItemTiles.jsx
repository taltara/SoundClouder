import React, { useState, useEffect } from "react";

const ListItemTiles = (props) => {
  const { item, onItemClick, index } = props;
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="list-item-tiles flex align-center space-start"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onItemClick(index)}
    ></div>
  );
};

export default ListItemTiles;
