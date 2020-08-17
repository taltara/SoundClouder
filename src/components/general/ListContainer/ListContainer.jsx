import React, { useState, useEffect } from "react";

import ListItem from "../ListItem/ListItem";
import TiltButton from "../../navigation/TiltButton/TiltButton";
import ListController from "../ListContainer/ListController";

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
    onSearchNext,
    onSearchBack,
    next,
    before,
    // playerCoords,
  } = props;
  const [didSearch, setDidSearch] = useState(false);
  const [itemsShown, setItemsShown] = useState([]);
  const [listExitClass, setListExitClass] = useState("shown-items");
  const [selected, setSelected] = useState({ ...emptySelectedState });

  const [searchView, setSearchView] = useState("tiles");

  useEffect(() => {
    console.log("HERE");
    if (listItems.length) {
      if (!didSearch) {
        setDidSearch(true);
      }
      if (!isStaticList && selected.index === "")
        setListExitClass("exit-class");
      setTimeout(() => {
        setItemsShown(listItems);
        if (!isStaticList && selected.index === "")
          setListExitClass("shown-items");
      }, 500);
    } else {
      if (didSearch) {
        setItemsShown(
          isStaticList ? [] : [{ label: "No Results Found! Try Again" }]
        );
      }
    }
    setSelected({ ...emptySelectedState });
  }, [listItems]);

  const onItemClick = (index) => {
    if (!isStaticList) {
      setSelected({ index });

      setTimeout(() => {
        setSelected({ ...emptySelectedState });
      }, 1000);
    }
    setChosenItem(index);
  };

  const getAnimationCoords = () => {
    // console.log(playerCoords, selected.coords);
    const isLarge = window.innerHeight >= 1200;
    //   return selected.coords
    //     ? {
    //         transform: `translateX(${-(selected.coords.left -
    //         playerCoords.left) +
    //         isLarge
    //           ? 400
    //           : 200}px) translateY(${
    //           -(selected.coords.top - playerCoords.top) + isLarge ? -400 : -200
    //         }px)`,
    //         position: "absolute",
    //         zIndex: 100,
    //         opacity: 0,
    //       }
    //     : {};
    return {
      transform: `translateX(${isLarge ? "300" : "200"}%) translateY(-${
        selected.index * isLarge ? 50 : 30
      }px)`,
      position: "absolute",
      zIndex: 100,
      opacity: 0,
    };
  };

  let containerClass =
    isStaticList || searchView === "list"
      ? "column align-center"
      : "wrap align-start tiles-container";

  // containerClass += itemsShown ? " shown-items" : "";

  const wrapperClass = isStaticList ? "static-wrap" : "non-static-wrap";
  // console.log("HERE");
  return (
    <div
      className={`list-container-wrapper flex column align-center space-between ${wrapperClass}`}
    >
      <ul
        className={`list-container flex ${containerClass} space-start ${listExitClass}`}
      >
        {itemsShown.map((item, index) => {
          // console.log(item);
          const classToAdd = !index
            ? `first-item item${index}`
            : `item${index}`;
          const labelStyleToAdd =
            selected.index !== index ? {} : getAnimationCoords();
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
            />
          ) : (
            <TiltButton
              key={index}
              clickData={index}
              label={item.label}
              activeLinkClass="activeTab"
              isTilt={true}
              buttonStyle={{
                backgroundImage: `url(${item.img})`,
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
          onSearchNext={onSearchNext}
          onSearchBack={onSearchBack}
          next={next}
          before={before}
        />
      ) : null}
    </div>
  );
};

export default ListContainer;
