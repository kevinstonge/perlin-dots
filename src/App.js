import Perlin from "./components/Perlin.js";
// import Sound from "./components/Sound.js";
import { useState } from "react";
import "./App.css";
function App() {
  const [width, setWidth] = useState(window.innerWidth / 2);
  const [noise, setNoise] = useState();
  window.onresize = () => {
    window.innerWidth < 1200 && setWidth(window.innerWidth / 2);
  };
  return (
    <>
      {/* <Perlin {...{ density: 6, width: 800, height: 800 }}/> */}
      <h1>Perlin Noise Landscape</h1>
      <Perlin width={width} setNoise={setNoise} />
      {/* <Sound noise={noise}/> */}
    </>
  );
}
export default App;
