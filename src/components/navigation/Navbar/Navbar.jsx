import React from "react";



import TypeSwitcher from "../../navigation/TypeSwitcher/TypeSwitcher";
import { ReactComponent as Logo } from "../../../assets/soundcloud.svg";

import Tilt from "react-tilt";

const Navbar = (props) => {
  const { theme, setTheme, storageService, saveKey } = props;

  const onThemeToggle = () => {
    let newTheme = "";
    setTheme((prevState) => {
      newTheme = prevState === "light" ? "dark" : "light";

      return newTheme;
    });

    let userPref = { ...storageService.loadFromStorage(saveKey) };
    userPref.theme = newTheme;
    storageService.saveToStorage(saveKey, userPref);
  }


  return (
    <div className={`navbar navbar-${theme} flex align-center space-between`}>
      <Tilt options={{ perspective: 500 }} className="Tilt flex align-center space-center">
        <Logo className="navbar-logo" />
      </Tilt>
      <TypeSwitcher
        handleTypeChange={onThemeToggle}
        dataTypes={[
          {
            type: "light",
            img: <div className="light-icon" />,
            label: "light",
          },
          { type: "dark", img: <div className="dark-icon" />, label: "dark" },
        ]}
        initType={theme === "light" ? 0 : 1}
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
