import { useEffect, useRef, useReducer, useCallback } from "react";
import generateDots from "../accessories/generateDots.js";
import noise from "noisejs";
function Perlin(props) {
  const { density, width, height, zMax } = props;
  const xDots = (density * width) / 100;
  const yDots = (density * height) / 100;
  const initialState = {
    noiseMap: new noise.Noise(Math.random()),
    xoff: 0,
    yoff: 0,
    dots: generateDots({ xDots, yDots, width, height }),
  };
  const reducer = (state, action) => {
    let newState = state;
    switch (action.type) {
      case "UPDATE_DOTS":
        newState = { ...state };
        newState.dots = [...newState.dots].map((dot) => {
          const z =
            zMax *
            state.noiseMap.simplex2(
              (dot.x + state.xoff) / 100,
              (dot.y + state.yoff) / 100
            );
          return {
            ...dot,
            z,
            l: Math.floor((50 * (z + zMax)) / zMax),
            size: (state.noiseMap.simplex2(dot.y / 100, dot.x / 100) + 2),
          };
        });
        newState.xoff = state.xoff + 1;
        newState.yoff = state.yoff + 1;
        return newState;
      case "NEW_DOTS":
        newState = { ...state };
        newState.dots = generateDots({ xDots, yDots, width, height });
        return newState;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      dispatch({ type: "UPDATE_DOTS" });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
  useEffect(() => {
    dispatch({ type: "NEW_DOTS" });
  },[props.width])
  return (
    <>
    <div
      className="perlin-frame"
      style={{
        position: 'relative',
        width:`${width*1.8}px`,
        backgroundColor: "black",
        boxShadow: "0 0 50px 50px black",
        overflow: "hidden",
        zIndex: "-1",
      }}
    >
      <div
        className="dot-container"
        style={{
          position: "relative",
          margin: "1rem auto",
          perspective: `${width}px`,
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <div
          className="dot plane"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            // transform: `rotate3d(1, 0, 0, 65deg) translateZ(${height / 3}px) translateY(${height/2}px)`,
            transform: `rotateY(20deg) rotateX(65deg) translateZ(${height / 3}px) translateY(${height/2}px)`,
            transformStyle: "preserve-3d",
            zIndex: "0"
          }}
        >
          {state.dots.length > 0 &&
            state.dots.map((dot, index) => {
              return (
                <div
                  className="dot"
                  key={`dot-${index}`}
                  style={{
                    position: "absolute",
                    left: dot.x,
                    top: dot.y,
                    backgroundColor: `hsl(${dot.h}, 50%, ${dot.l}%)`,
                    boxShadow: `0 0 ${dot.size+1}px 1px hsl(${dot.h}, 75%, ${dot.l}%)`,
                    width: `${dot.size}px`,
                    height: `${dot.size}px`,
                    borderRadius: "50%",
                    transform: `translateZ(${dot.z}px)`,
                    transformStyle: "preserve-3d"
                  }}
                ></div>
              );
            })}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundImage: "linear-gradient(to right, black 0, transparent 10%, transparent 90%, black 100%",
          zIndex: "2"
        }}
      >
        </div>
      </div>
      </>
  );
}
Perlin.defaultProps = {
  density: 3,
  width: 600,
  height: 300,
  zMax: 12,
};
export default Perlin;
