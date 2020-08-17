import React from "react";

import TypeSwitcher from "../../navigation/TypeSwitcher/TypeSwitcher";
import { ReactComponent as Logo } from "../../../assets/soundcloud.svg";

import Tilt from "react-tilt";

const Navbar = (props) => {
  const { theme, setTheme } = props;
  return (
    <div className={`navbar navbar-${theme} flex align-center space-between`}>
      <Tilt options={{ perspective: 500 }} className="Tilt flex align-center space-center">
        <Logo className="navbar-logo" />
      </Tilt>
      <TypeSwitcher
        handleTypeChange={() =>
          setTheme((prevState) => {
            return prevState === "light" ? "dark" : "light";
          })
        }
        dataTypes={[
          {
            type: "light",
            img: <div className="light-icon" />,
            label: "light",
          },
          { type: "dark", img: <div className="dark-icon" />, label: "dark" },
        ]}
        initType={0}
        animation="activeTab"
        switcherClass="type-switcher"
        switcherImgClass="switcher-img"
        swticherLabelClass="switcher-label"
        switchOnStart={false}
      />
    </div>
  );
};

export default Navbar;
