import React, { useState, useEffect } from "react";

import "./_TiltButton.scss";

import Tilt from "react-tilt";

const TiltButton = (props) => {
  let buttonRef = [];

  const {
    label,
    clickData,
    activeLink,
    activeLinkClass,
    isTilt,
    tiltOptions,
    tiltClass,
    buttonClass,
    titleClass,
    buttonStyle,
    buttonType,
    buttonForumType,
    animation,
    onClick,
    theme,
    disabled,
    tileStyleClassAdd
  } = props;

  const [tiltTypeClass, setTiltTypeClass] = useState("");
  const [innerTiltTypeClass, setInnerTiltTypeClass] = useState("");
  const [buttonStyleState, setButtonStyleState] = useState(buttonStyle ? buttonStyle : {});

  useEffect(() => {
    setButtonRippleListeners(animation);
  }, []);

  

  const setButtonRippleListeners = (name = "general") => {
    [].map.call([buttonRef], (el) => {
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

  const setButtonRef = (element) => {
    buttonRef = element;
  };

  const isActiveButton = () => {
    if (label === "home") {
      if (activeLink === "" || activeLink === "home") return true;
    } else {
      if (activeLink === label) return true;
    }

    return false;
  };

  const isType = (type) => type === buttonType;

  const disabledButtonStyle = disabled ? { pointerEvents: "none" } : {};
  const allButtonStyle = { ...buttonStyleState, ...disabledButtonStyle };
  let allButtonClass =
    buttonClass && buttonClass !== "tilt-button" ? buttonClass : "";
  allButtonClass += theme === "dark" ? " button-light" : " button-dark";
  const tiltOptionSet = !isTilt ? { max: 0 } : {};
  const isActive = isActiveButton();
  const addTitleClass = titleClass ? titleClass : "";
  const animationName = animation ? animation : "";

  return (
    <button className="tilt-button-wrap" type={buttonForumType}>
      <Tilt
        className={`Tilt ${tiltTypeClass} ${tiltClass && tiltClass}`}
        options={{ ...tiltOptions, ...tiltOptionSet }}
      >
        <li
          className={`Tilt-inner tilt-button ${innerTiltTypeClass} ${allButtonClass} ${tileStyleClassAdd}`}
          onClick={() => {
            if (onClick) {
              onClick(clickData);
            }
          }}
          anim={animationName}
          ref={setButtonRef}
          style={allButtonStyle}
        >
          <p className={`${addTitleClass}`}>{label}</p>
        </li>
      </Tilt>
    </button>
  );
};

export default TiltButton;
