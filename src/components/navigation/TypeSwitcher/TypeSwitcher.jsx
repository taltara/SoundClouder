import React, { useState, useEffect } from "react";

import "./_TypeSwitcher.scss";

const TypeSwitcher = (props) => {
  let switcherRef = null;

  const {
    dataTypes,
    initType,
    handleTypeChange,
    animation,
    switcherClass,
    switcherImgClass,
    swticherLabelClass,
    switchOnStart,
    disabled,
    theme
  } = props;

  const [currTypeIndex, setCurrTypeIndex] = useState(initType);
  const [switchTransitionClass, setSwitcherTransitionClass] = useState("");
  const [toggleCount, setToggleCount] = useState(0);

  useEffect(() => {
    setButtonRippleListeners(animation);
    if (switchOnStart) {
      setTimeout(() => {
        toggleType(true);
      }, 100);
    }
  }, []);

  const setSwitcherRef = (element) => {
    switcherRef = element;
  };

  const setButtonRippleListeners = (name = "general") => {
    [].map.call([switcherRef], (el) => {
      el.addEventListener("click", (e) => {
        e = e.touches ? e.touches[0] : e;
        const r = el.getBoundingClientRect(),
          d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
        el.style.cssText = `--s: 0; --o: 1;`;
        // eslint-disable-next-line no-unused-expressions
        el.offsetTop;
        el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${
          e.clientX - r.left
        }; --y:${e.clientY - r.top};`;
      });
    });
  };

  const toggleType = (isStart = false) => {
    console.log(disabled, dataTypes[0]);

    let newValue =
      currTypeIndex + 1 === dataTypes.length ? 0 : currTypeIndex + 1;
    let animationDirection = "";
    if (toggleCount % 2) {
      animationDirection = "right";
    } else {
      animationDirection = "left";
    }

    setSwitcherTransitionClass(`out-${animationDirection}`);

    setTimeout(() => {
      setSwitcherTransitionClass(`in-${animationDirection}`);
      setTimeout(() => {
        setCurrTypeIndex(newValue);
        if(!isStart)handleTypeChange(dataTypes[newValue].type);
        setTimeout(() => {
          setSwitcherTransitionClass("");
        }, 100);
      });
    }, 200);

    // animateContent(currValue);
    setToggleCount((prevState) => (prevState += 1));
  };

  const label = dataTypes[currTypeIndex].label;
  const icon = dataTypes[currTypeIndex].img;
  return (
    <div
      className={`${switcherClass && switcherClass} switcher-${theme}`}
      anim={animation}
      ref={setSwitcherRef}
      onClick={() => {
        if (!disabled) toggleType();
      }}
    >
      <div
        className={`flex align-center space-center img-${switchTransitionClass} ${
          switcherImgClass && switcherImgClass
        }`}
      >
        {icon}
      </div>
      <p
        className={`label-${switchTransitionClass} ${
          swticherLabelClass && swticherLabelClass
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default TypeSwitcher;
