import React, { useState } from 'react';

import "./style/global.scss";
import SoundClouder from "./pages/SoundClouder";
import Navbar from "./components/navigation/Navbar/Navbar";
import storageService from "./services/storageService";
import { KEY_USER_PREF } from "./services/auth";

function App() {

  const initTheme = () => {

    const userPref = storageService.loadFromStorage(KEY_USER_PREF);
    if(userPref && (userPref.theme === "light" || userPref.theme === "dark")) {
      return userPref.theme;
    } else return "light";
  }
  const [theme, setTheme] = useState(initTheme());



  return (
    <div className={`App App-${theme} flex column align-center space-start`}>
      <Navbar theme={theme} setTheme={setTheme} storageService={storageService} saveKey={KEY_USER_PREF} />
      <SoundClouder theme={theme} />
    </div>
  );
}

export default App;
