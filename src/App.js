import React, { useState } from 'react';

import "./style/global.scss";
import SoundClouder from "./pages/SoundClouder";
import Navbar from "./components/navigation/Navbar/Navbar";


function App() {

  const [theme, setTheme] = useState("light");
  return (
    <div className={`App App-${theme} flex column align-center space-start`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <SoundClouder theme={theme} />
    </div>
  );
}

export default App;
