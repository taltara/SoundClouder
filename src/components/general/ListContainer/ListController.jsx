import React, { useEffect } from "react";

import utilServices from "../../../services/utilService";
import storageService from "../../../services/storageService";
import { KEY_USER_PREF } from "../../../services/auth";

import { ReactComponent as BackArrowIcon } from "../../../assets/full-arrow.svg";
import { ReactComponent as ArrowIcon } from "../../../assets/right-arrow.svg";
import { ReactComponent as ListIcon } from "../../../assets/list.svg";
import { ReactComponent as TilesIcon } from "../../../assets/tiles.svg";

import TypeSwitcher from "../../navigation/TypeSwitcher/TypeSwitcher";

const ListController = (props) => {
  const { toggleView, onSearchNext, next, canToggle, initToggle, theme } = props;

  useEffect(() => {
    utilServices.setButtonRippleListeners("general");
  }, [])

  const onViewChange = () => {
    let previousView;
    toggleView((prevState) => {
      previousView = prevState;
      return prevState === "list" ? "tiles" : "list";
    });
    let currUserPref = {...storageService.loadFromStorage(KEY_USER_PREF)};
    currUserPref.searchView = previousView === "list" ? 0 : 1;
    storageService.saveToStorage(KEY_USER_PREF, currUserPref);
  };

  const nextClass = !next ? "no-next" : "";

  return (
    <div className="list-controller flex align-center space-between">
      <div className={`arrow-container flex align-center space-start`}>
        <span
          className={`arrow-hover-span ${nextClass} flex align-center space-center`}
          onClick={() => onSearchNext(next)}
          anim="general"
        >
          <BackArrowIcon className="background-arrow" />
          <ArrowIcon className="arrow" />
        </span>
      </div>

      <TypeSwitcher
        handleTypeChange={onViewChange}
        dataTypes={[
          { type: "list", img: <ListIcon />, label: "" },
          { type: "tiles", img: <TilesIcon />, label: "" },
        ]}
        initType={initToggle}
        animation="activeTab"
        switcherClass="type-switcher"
        switcherImgClass="switcher-img"
        swticherLabelClass="switcher-label"
        switchOnStart={true}
        disabled={canToggle}
        theme={theme}
      />
    </div>
  );
};

export default ListController;
