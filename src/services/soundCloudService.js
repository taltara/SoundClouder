import SC from "soundcloud";
import { CLIENT_ID } from "./auth";
import loadScript from "load-script";

const PAGE_SIZE_LIMIT = 6;

SC.initialize({
  client_id: CLIENT_ID,
});

async function getCloudSounds(searchObj) {
  const { q } = searchObj;

  return await SC.get("/tracks", {
    q,
    limit: PAGE_SIZE_LIMIT,
    linked_partitioning: 1,
    offset: 0
  }).then((tracks) => {
    console.log(tracks);
    return Promise.resolve(tracks);
  });
}

const getNextTracks = (link) => {

  return fetch(link)
    .then((res) => res.json())
    .then((result) => {
     console.log(result);
     return result;
    });
};

async function getSoundCloudPlayer(track_url) {
  return await SC.oEmbed(track_url, {
    auto_play: true,
    maxheight: "100%",
    
  }).then((oEmbed) => {
    console.log("oEmbed response: ", oEmbed);
    return oEmbed;
  });
}

const togglePlay = (prevState) => {
  var iframeElement = document.querySelector("iframe");
  const soundWidget = SC.Widget(iframeElement);

  if (prevState) soundWidget.pause();
  else soundWidget.play();
};

const initPlayerListeners = () => {
  loadScript("https://w.soundcloud.com/player/api.js", () => {
  const iframeId = document.getElementById("sound-cloud-player");
    const player = SC.Widget(iframeId);

    const { PLAY, PAUSE } = SC.Widget.Events;

    player.bind(PLAY, function () {

      togglePlay(true);
    });
    player.bind(PAUSE, function () {

      player.isPaused((playerIsPaused) => {
        if (playerIsPaused) togglePlay(false);
      });
    });
  });
};

export default {
  getCloudSounds,
  getSoundCloudPlayer,
  togglePlay,
  initPlayerListeners,
  getNextTracks
};
