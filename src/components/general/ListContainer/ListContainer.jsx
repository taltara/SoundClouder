import React, { useState, useEffect } from "react";

import ListItem from "../ListItem/ListItem";
import TiltButton from "../../navigation/TiltButton/TiltButton";
import ListController from "../ListContainer/ListController";

import storageService from "../../../services/storageService";
import { KEY_USER_PREF } from "../../../services/auth";

const ListContainer = (props) => {
  const emptySelectedState = {
    index: "",
    coords: {
      left: "",
      right: "",
      top: "",
      bottom: "",
      x: "",
      y: "",
      height: "",
      width: "",
    },
  };
  const {
    listItems,
    isStaticList,
    setChosenItem,
    onSearchBack,
    next,
    theme,
  } = props;

  const [didSearch, setDidSearch] = useState(false);
  const [itemsShown, setItemsShown] = useState([]);
  const [listExitClass, setListExitClass] = useState("");
  const [containerClass, setContainerClass] = useState("");
  const [selected, setSelected] = useState({ ...emptySelectedState });

  const initStarter = () => {
    const userPref = storageService.loadFromStorage(KEY_USER_PREF);
    if (
      userPref &&
      (+userPref.searchView === 0 || +userPref.searchView === 1)
    ) {
      return userPref.searchView;
    } else return 1;
  };

  const [initToggle, setInitToggle] = useState(initStarter());
  const [searchView, setSearchView] = useState(initToggle ? "list" : "tiles");

  useEffect(() => {
    if (listItems.length) {
      if (!didSearch) {
        setDidSearch(true);
      }

      setTimeout(() => {
        setItemsShown(listItems);
      }, 500);
    } else {
      if (didSearch) {
        setItemsShown(
          isStaticList ? [] : [{ label: "No Results Found! Try Again" }]
        );
      }
    }
    setSelected({ ...emptySelectedState });
    if (!isStaticList) {
      setListExitClass("");
    }
    setTimeout(() => {
      setListExitClass("shown-items");
    }, 1000);
  }, [listItems]);

  const onItemClick = (index) => {
    if (!isStaticList) {
      setSelected({ index });

      setTimeout(() => {
        setSelected({ ...emptySelectedState });
        setChosenItem(index);
      }, 500);
    } else {
      setChosenItem(index);
    }
    setContainerClass("overflowing");
    setTimeout(() => {
      setContainerClass("");
    }, 500);
  };

  const getAnimationStyle = () => {
    const isLarge = window.innerHeight >= 1200;
    return {
      transform: `translateX(${isLarge ? "200" : "100"}%)`,
      position: "absolute",
      zIndex: 100,
      opacity: 0,
      transition: "0.1s ease-in-out",
    };
  };

  let containerClassAdd =
    isStaticList || searchView === "list"
      ? "column align-center"
      : "wrap align-start tiles-container";

  const wrapperClass = isStaticList ? "static-wrap" : "non-static-wrap";

  return (
    <div
      className={`list-container-wrapper flex column align-center space-between ${wrapperClass}`}
    >
      <ul
        className={`list-container flex ${containerClassAdd} space-start ${listExitClass} ${containerClass}`}
      >
        {itemsShown.map((item, index) => {
          let classToAdd = !index
            ? `first-item item${index} `
            : `item${index} `;
          classToAdd += containerClass;

          const labelStyleToAdd =
            selected.index !== index ? {} : getAnimationStyle();
          const tileStyleToAdd = selected.index === index ? "tile-play" : "";
          const clickFunc = didSearch && !listItems.length ? null : onItemClick;
          return isStaticList || searchView === "list" || !clickFunc ? (
            <ListItem
              key={index}
              index={index}
              item={item}
              onItemClick={clickFunc}
              classAdd={classToAdd}
              isStaticList={isStaticList}
              animName={selected.index !== index ? "activeTab" : ""}
              labelStyleAdd={labelStyleToAdd}
              selectedExists={selected.index !== ""}
            />
          ) : (
            <TiltButton
              key={index}
              clickData={index}
              label={item.label}
              activeLinkClass="activeTab"
              isTilt={true}
              buttonStyle={{
                background: item.img
                  ? `url(${item.img})`
                  : `rgba(0, 0, 0, 0.75)`,
                backgroundSize: "cover",
              }}
              tiltOptions={{ scale: 1.05 }}
              animation="general"
              buttonClass={`tilt-button tile-tilt item${index}`}
              onClick={clickFunc}
              tileStyleClassAdd={tileStyleToAdd}
            />
          );
        })}
      </ul>
      {!isStaticList ? (
        <ListController
          toggleView={setSearchView}
          onSearchBack={onSearchBack}
          next={next}
          canToggle={itemsShown.length === 0}
          initToggle={initToggle}
          theme={theme}
        />
      ) : null}
    </div>
  );
};

export default ListContainer;
