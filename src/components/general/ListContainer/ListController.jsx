import React, { useState, useEffect } from "react";

import storageService from "../../../services/storageService";
import { KEY_VIEW } from "../../../services/auth";

// import { ReactComponent as ArrowIcon } from "../../../assets/arrow.svg";
import { ReactComponent as BackArrowIcon } from "../../../assets/full-arrow.svg";
import { ReactComponent as ArrowIcon } from "../../../assets/right-arrow.svg";
import { ReactComponent as ListIcon } from "../../../assets/list.svg";
import { ReactComponent as TilesIcon } from "../../../assets/tiles.svg";

import TypeSwitcher from "../../navigation/TypeSwitcher/TypeSwitcher";

const ListController = (props) => {
  const { toggleView, onSearchNext, onSearchBack, next, before, canToggle, initToggle } = props;

  const onViewChange = () => {
    let previousView;
    toggleView((prevState) => {
      previousView = prevState;
      return prevState === "list" ? "tiles" : "list";
    });

    storageService.saveToStorage(KEY_VIEW, previousView === "list" ? 0 : 1);
  };

  const nextClass = !next ? "no-next" : "";
  const beforeClass = !before ? "no-before" : "";

  return (
    <div className="list-controller flex align-center space-between">
      <div className={`arrow-container flex align-center space-start`}>
        <span
          className={`arrow-hover-span ${nextClass} flex align-center space-center`}
          onClick={() => onSearchNext(next)}
        >
          <BackArrowIcon className="background-arrow" />
          <ArrowIcon className="arrow" />
        </span>
        {/* <span className={`arrow-hover-span back-arrow ${beforeClass} flex align-center space-center`} onClick={() => onSearchBack()}>
          <BackArrowIcon className="background-arrow" />
          <ArrowIcon className="arrow" />
        </span> */}
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
      />
    </div>
  );
};

export default ListController;
