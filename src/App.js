import Perlin from "./components/Perlin.js";
import "./App.css";
function App() {
  return (
    <>
      {/* <Perlin {...{ xDots: 20, yDots: 20, width: 800, height: 800 }}/> */}
      <h1>Perlin Noise Landscape</h1>
      <Perlin />
    </>
  );
}
export default App;
