import React, { useState, useEffect, createRef } from "react";

import utilServices from "../../../services/utilService";

import { useSpring, animated } from "react-spring";

const ListItem = (props) => {
  let itemRef = createRef();
  const { item, onItemClick, index, classAdd, isStaticList, animName, labelStyleAdd } = props;
  const [key, setKey] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    utilServices.setButtonRippleListeners("activeTab");
  }, []);


  const msPerLetter = 115;
  const longTextLimit = window.innerHeight >= 1200 ? 46 : 29;
  const shortTextLimit = window.innerHeight >= 1200 ? 33 : 21;
  const currTextLimit = isStaticList ? shortTextLimit : longTextLimit;
  const isLongTLabel = item.label.length >= currTextLimit;

  const scrolling = useSpring({
    from: { transform: "translate(0%,0)" },
    to: { transform: "translate(-100%,0)" },
    config: { duration: msPerLetter * item.label.length },
    reset: true,
    //reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    },
  });


  const textToShow =
  (isLongTLabel && isHovering) && labelStyleAdd !== {} ? (
      <animated.div style={scrolling} className="item-label">
        {item.label}
      </animated.div>
    ) : (
      <div className="item-label label-div" style={{ ...labelStyleAdd }}>{item.label}</div>
    );

  const onClickFunc = onItemClick ? () => onItemClick(index, itemRef.current.getBoundingClientRect()) : null;
  return (
    <li
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClickFunc}
      className={`list-item ${classAdd} flex align-center space-start`}
      anim={animName}
      ref={itemRef}
    >
      {textToShow}
    </li>
  );
};

export default ListItem;
