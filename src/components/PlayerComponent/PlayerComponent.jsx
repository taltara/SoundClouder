import React, { useState, useEffect, createRef } from "react";

import sCService from "../../services/soundCloudService.js";

import ReactPlayer from "react-player";

let middleRef = createRef();

const PlayerComponent = (props) => {

  const { track, setPlayerCoords } = props;

  const [playerClass, setPlayerClass] = useState("");
  const [imgStateClass, setImgStateClass] = useState("");
  const [playerVolume, setPlayerVolume] = useState(0.8);
  const [playedTrack, setPlayedTrack] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    sCService.initPlayerListeners();
    getPlayerCoords();
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    setPlayerClass("");
    setTimeout(() => {
      setImgStateClass("shown");
      // if (window.innerHeight <= 1200)
        // document.querySelector(".visualAudible__body").style.display = "none";
    }, 2000);
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

  const getPlayerCoords = () => {
    setPlayerCoords(middleRef.current.getBoundingClientRect());
  };

  const onVolumeChange = ({ target }) => {
    // console.log(target.value);
    setPlayerVolume(+target.value);
  };

  const onImgClick = () => {
    // console.log(isPlaying ? "STOPPING" : "PLAYING");
    debugger;
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

  // console.log(isPlaying);
  return (
    <div
      className={`Tilt-inner player-component ${componentClass} flex column align-center space-start`}
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
              width="95%"
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
      ) : null}
    </div>
  );
};

export default PlayerComponent;
