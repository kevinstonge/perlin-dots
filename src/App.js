import PerlinSI from "./components/PerlinSI.js";
import PerlinCSS from "./components/PerlinCSS.js";
import PerlinRAF from "./components/PerlinRAF.js";
import { useState } from "react";
import "./App.css";
function App() {
  const [implementation, setImplementation] = useState("RAF");
  return (
    <>
      {/* <Perlin {...{ density: 6, width: 800, height: 800 }}/> */}
      <h1>Perlin Noise Landscape</h1>
      <div className="button-row">
        <p>implementation: </p>
        <button onClick={() => setImplementation("SI")}>
          setInterval (100ms)
        </button>
        <button onClick={() => setImplementation("CSS")}>
          css transitions (1/sec)
        </button>
        <button onClick={() => setImplementation("RAF")}>
          requestAnimationFrame
        </button>
      </div>
      {implementation === "SI" && <PerlinSI />}
      {implementation === "CSS" && <PerlinCSS />}
      {implementation === "RAF" && <PerlinRAF />}
    </>
  );
}
export default App;
