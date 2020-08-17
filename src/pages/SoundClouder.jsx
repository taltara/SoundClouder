import React, { useState, useEffect } from "react";

import sCService from "../services/soundCloudService.js";
import storageService from "../services/storageService";
import DataBlock from "../components/DataBlock/DataBlock";
import { KEY_HISTORY } from "../services/auth";

import SearchComponent from "../components/SearchComponent/SearchComponent";
import PlayerComponent from "../components/PlayerComponent/PlayerComponent";
import HistoryComponent from "../components/HistoryComponent/HistoryComponent";

const SoundClouder = (props) => {
  const { theme } = props;

  const [searchIndex, setSearchIndex] = useState(0);
  const [allSearches, setAllSearches] = useState([]);
  const [currSearch, setCurrSearch] = useState([]);
  const [next, setNext] = useState(null);
  const [before, setBefore] = useState(null);
  const [currChoice, setCurrChoice] = useState("");
  const [currChoiceData, setCurrChoiceData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  

  // const [playerCoords, setPlayerCoords] = useState({});

  useEffect(() => {
    const currHistory = storageService.loadFromStorage(KEY_HISTORY);
    if (currHistory) setSearchHistory(currHistory);
  }, []);


  useEffect(() => {
    if (currChoice !== "") {
      setCurrChoiceData(currSearch[currChoice]);
    }
  }, [currChoice]);

  const onSearch = (q) => {
    sCService.getCloudSounds({ q }).then((res) => {
      console.log(res);
      setCurrSearch(res.collection);
      setAllSearches([res.collection]);
      setSearchIndex(0);
      if(before) setBefore(null);
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
      setBefore(allSearches[searchIndex]);
      setCurrSearch(res.collection);
      setSearchIndex((prevState) => prevState + 1);
      setNext(res.next_href ? res.next_href : null);
    });
  };

  const onSearchBack = () => {
    if(searchIndex - 1 >= 0) {
      setNext(currSearch);
      setCurrSearch(allSearches[searchIndex - 1]);
      setSearchIndex((prevState) => prevState - 1)
      if(searchIndex - 2 >= 0) {
        setBefore(allSearches[searchIndex - 2]);
      }
    }
  }

  const searchResults = currSearch.map((item) => {
    return { label: item.title, img: item.artwork_url };
  });
  // console.log(allSearches, searchIndex);
  return (
    <div
      className={`soundclouder soundclouder-${theme} flex align-center space-around`}
    >
      <DataBlock tilts={false}>
        <SearchComponent
          searchResults={searchResults}
          onSearch={onSearch}
          setSearchHistory={setSearchHistory}
          setChosenItem={setCurrChoice}
          saveHistory={storageService.saveToStorage}
          saveKey={KEY_HISTORY}
          searchHistory={searchHistory}
          onSearchNext={onSearchNext}
          onSearchBack={onSearchBack}
          next={next}
          before={before}
          // playerCoords={playerCoords}
        />
      </DataBlock>
      <DataBlock tilts={true}>
        <PlayerComponent
          track={currChoiceData}

          // setPlayerCoords={setPlayerCoords}
        />
      </DataBlock>
      <DataBlock tilts={false}>
        <HistoryComponent history={searchHistory} historySearch={onSearch} />
      </DataBlock>
    </div>
  );
};

export default SoundClouder;
