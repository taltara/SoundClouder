import React, { useEffect, useState } from "react";

import TiltButton from "../navigation/TiltButton/TiltButton";
import ListContainer from "../general/ListContainer/ListContainer";
import LoadingRing from "./LoadingRing";

const SearchComponent = (props) => {
  const {
    onSearch,
    searchResults,
    setSearchHistory,
    setChosenItem,
    saveHistory,
    saveKey,
    searchHistory,
    onSearchNext,
    next,
    theme
    // playerCoords,
  } = props;
  const [currSearch, setCurrSearch] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSearching(false);
    }, 500);
  }, [searchResults]);

  useEffect(() => {
    if (searchHistory.length) {
      saveHistory(saveKey, searchHistory);
    }
  }, [searchHistory]);

  const onSearchSubmit = (event) => {
    event.preventDefault();
    if (searching) return;

    setSearching(true);
    onSearch(currSearch);

    setSearchHistory((prevState) => {
      let history = [...prevState];
      if (history.length) {
        if (history[0].label !== currSearch)
          history.unshift({ label: currSearch });
      } else history = [{ label: currSearch }];

      return history;
    });
  };

  const onSearchChange = ({ target }) => {
    setCurrSearch(target.value);
  };

  return (
    <div className="search-component" onSubmit={onSearchSubmit}>
      <form action="" className="search-form flex align-center space-between">
        <input
          type="text"
          name="q"
          placeholder="Search SoundCloud"
          onChange={onSearchChange}
          value={currSearch}
          className="search-input"
          autoFocus={true}
        />
        {searching ? (
          <LoadingRing theme={theme}/>
        ) : (
          <TiltButton
            label={"Go"}
            activeLinkClass="activeTab"
            isLinkToExact={true}
            isTilt={true}
            tiltOptions={{ scale: 1.05 }}
            animation="general"
            //   onClick={onSearchSubmit}
            buttonClass="tilt-button"
            buttonForumType="submit"
          />
        )}
      </form>

      <ListContainer
        listItems={searchResults}
        isStaticList={false}
        setChosenItem={setChosenItem}
        onSearchNext={onSearchNext}
        next={next}
        theme={theme}
        // playerCoords={playerCoords}
      />
    </div>
  );
};

export default SearchComponent;
