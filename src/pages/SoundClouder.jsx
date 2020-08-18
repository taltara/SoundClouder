import React, { useState, useEffect } from "react";

import sCService from "../services/soundCloudService.js";
import storageService from "../services/storageService";
import { KEY_USER_PREF } from "../services/auth";

import DataBlock from "../components/DataBlock/DataBlock";
import SearchComponent from "../components/SearchComponent/SearchComponent";
import PlayerComponent from "../components/PlayerComponent/PlayerComponent";
import HistoryComponent from "../components/HistoryComponent/HistoryComponent";

const SoundClouder = (props) => {
  const { theme } = props;

  const [searchIndex, setSearchIndex] = useState(0);
  const [allSearches, setAllSearches] = useState([]);
  const [currSearch, setCurrSearch] = useState([]);
  const [next, setNext] = useState(null);
  const [currChoice, setCurrChoice] = useState("");
  const [currChoiceData, setCurrChoiceData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const userPref = storageService.loadFromStorage(KEY_USER_PREF);
    if (userPref && userPref.searchHistory) setSearchHistory(userPref.searchHistory);
  }, []);


  useEffect(() => {
    if (currChoice !== "") {
      setCurrChoiceData(currSearch[currChoice]);
    }
  }, [currChoice]);

  const onSearch = (q) => {
    sCService.getCloudSounds({ q }).then((res) => {

      setCurrSearch(res.collection);
      setAllSearches([res.collection]);
      setSearchIndex(0);
      setNext(res.next_href ? res.next_href : null);
    });
  };

  const onSearchNext = (next) => {
    sCService.getNextTracks(next).then((res) => {
      setAllSearches((prevState) => {
        let currSearches = [ ...prevState];
        currSearches.push(res.collection);
        return currSearches;
      });
      setCurrSearch(res.collection);
      setSearchIndex((prevState) => prevState + 1);
      setNext(res.next_href ? res.next_href : null);
    });
  };

  const saveHistory = (key, history) => {
    let userPref = { ...storageService.loadFromStorage(key) };
    userPref.searchHistory = history;
    storageService.saveToStorage(key, userPref);
  }

  const searchResults = currSearch.map((item) => {
    return { label: item.title, img: item.artwork_url };
  });

  return (
    <div
      className={`soundclouder soundclouder-${theme} flex align-center space-around`}
    >
      <DataBlock tilts={false} isPlayer={false}>
        <SearchComponent
          searchResults={searchResults}
          onSearch={onSearch}
          setSearchHistory={setSearchHistory}
          setChosenItem={setCurrChoice}
          saveHistory={saveHistory}
          saveKey={KEY_USER_PREF}
          searchHistory={searchHistory}
          onSearchNext={onSearchNext}
          next={next}
          theme={theme}
          // playerCoords={playerCoords}
        />
      </DataBlock>
      <DataBlock tilts={true} isPlayer={true}>
        <PlayerComponent
          track={currChoiceData}
          storageService={storageService}
          saveKey={KEY_USER_PREF}
          // setPlayerCoords={setPlayerCoords}
        />
      </DataBlock>
      <DataBlock tilts={false} isPlayer={false}>
        <HistoryComponent history={searchHistory} historySearch={onSearch} />
      </DataBlock>
    </div>
  );
};

export default SoundClouder;
