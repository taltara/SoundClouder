import React, { useState, useEffect, createRef } from "react";

import sCService from "../../services/soundCloudService.js";

import ReactPlayer from "react-player";

let middleRef = createRef();

const PlayerComponent = (props) => {
  const { track, storageService, saveKey } = props;

  const [playerClass, setPlayerClass] = useState("");
  const [imgStateClass, setImgStateClass] = useState("");

  const initStarter = () => {
    const userPref = storageService.loadFromStorage(saveKey);

    if (userPref && !isNaN(+userPref.playerVolume)) {
      return userPref.playerVolume;
    } else return 0.8;
  };

  const [playerVolume, setPlayerVolume] = useState(initStarter());
  const [playedTrack, setPlayedTrack] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    sCService.initPlayerListeners();
    // getPlayerCoords();

  }, []);

  useEffect(() => {

    const timer = setTimeout(() => {
      setUserVolumePref();
    }, 1000);

    return () => clearTimeout(timer);

  }, [playerVolume])

  const setUserVolumePref = () => {
    let userPref = { ...storageService.loadFromStorage(saveKey) };
    userPref.playerVolume = playerVolume;
    storageService.saveToStorage(saveKey, userPref);
  };

  useEffect(() => {
    setIsPlaying(false);
    setPlayerClass("");
    setImgStateClass("");
    setTimeout(() => {
      setImgStateClass("shown");
    }, 500);
    setPlayedTrack(false);
  }, [track]);

  useEffect(() => {
    setPlayerClass((prevState) => {
      if (isPlaying) {
        setPlayedTrack(true);
        return "shown-player";
      } else if (playedTrack) return "shown-player";
      else return "";
    });
  }, [isPlaying]);

  const onVolumeChange = ({ target }) => {

    setPlayerVolume(+target.value);
  };

  const onImgClick = () => {

    setIsPlaying((prevState) => {
      sCService.togglePlay(prevState);
      return !prevState;
    });
  };

  const handlePlayToggle = (toPlay) => {
    setIsPlaying(toPlay);
  };

  const imgClass = isPlaying ? "shown playing" : "";
  const toneArmClass = isPlaying ? "arm-shown" : "";
  const recordCenterClass = isPlaying ? "middle-shown" : "";
  const componentClass = isPlaying ? "component-playing" : "";
const isLarge = window.innerHeight >= 1200;
  return (
    <div
      className={`Tilt-inner player-component ${componentClass} flex column align-center space-center`}
      ref={middleRef}
    >
      {track && track.artwork_url ? (
        <div className="player-img-wrapper flex column align-center space-center">
          <div className="img-artwork-wrapper">
            <img
              src={track.artwork_url}
              alt=""
              className={`player-img ${imgClass} ${imgStateClass}`}
              onClick={onImgClick}
            />
          </div>
          <img
            src={require("../../assets/arm.png")}
            alt=""
            className={`player-tonearm ${toneArmClass}`}
          />
          <div
            className={`record-player-center ${recordCenterClass}`}
            id="player-middle"
          ></div>
          <section
            className={`player-section flex align-center space-between ${playerClass}`}
          >
            <ReactPlayer
              url={track.permalink_url}
              width={`${isLarge ? 97.5 : 95.75}%`}
              height="100%"
              playing={isPlaying}
              volume={playerVolume}
              config={{
                soundcloud: {
                  auto_play: true,
                  show_user: false,
                  buying: false,
                },
              }}
              onPlay={() => handlePlayToggle(true)}
              onPause={() => handlePlayToggle(false)}
              onEnded={() => handlePlayToggle(false)}
            />
            <input
              type="range"
              className="volume-slider"
              orient="vertical"
              min={0}
              step={0.01}
              max={1}
              name="volume"
              onChange={onVolumeChange}
              value={playerVolume}
            />
          </section>
        </div>
      ) : <p className="init-player-message Tilt-inner">Choose a track to start the <span>party</span>!</p> }
    </div>
  );
};

export default PlayerComponent;
