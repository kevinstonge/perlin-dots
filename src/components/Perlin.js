import { useReducer, useEffect } from "react";
import generateDots from "../accessories/generateDots.js";
import useInterval from "../accessories/useInterval.js";
import noise from "noisejs";
function Perlin(props) {
    const { density, width, height, zMax } = props;
    const xDots = density * width/100;
    const yDots = density * height/100;
    const initialState = {
        noiseMap: new noise.Noise(Math.random()),
        xoff: 0,
        yoff: 0,
        dots: generateDots({ xDots, yDots, width, height }),
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case "UPDATE_DOTS":
                const newState = { ...state };
                newState.dots = [...newState.dots].map(dot => {
                    const z = zMax * state.noiseMap.simplex2((dot.x + state.xoff) / 100, (dot.y + state.yoff) / 100);
                    return ({
                        ...dot,
                        z,
                        l: Math.floor((50) * (z + zMax) / zMax),
                        size: (state.noiseMap.simplex2(dot.y/100, dot.x/100) + 2) * 1.2
                    })
                });
                newState.xoff = state.xoff + 1;
                newState.yoff = state.yoff + 1;
                return newState;
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        dispatch({ type: "UPDATE_DOTS" });
    },[])
    useInterval(() => {
        dispatch({ type: "UPDATE_DOTS" })
    }, 100)
    return (
        <div 
            className="dot-container"
            style={{
                position: "relative",
                margin: "1rem auto",
                perspective: `${width}px`,
                width: `${width}px`,
                height: `${height}px`,
                border: "1px solid #555",
                boxShadow: "5px 5px 5px 0 #050505",
                borderRadius: "0.25rem",
                backgroundColor: "black",
                overflow: "hidden"
            }}
        >
            <div className="dot plane" style={{
                position: "absolute",
                transform: `rotate3d(1, 0, 0, 60deg) translateY(${height / 2}px)`,
                transformStyle: "preserve-3d",
            }}>
                {state.dots.length > 0 && state.dots.map((dot, index) => {
                    return (
                    <div
                        className="dot"
                        key={`dot-${index}`}
                        style={{
                            position: "absolute",
                            left: dot.x,
                            top: dot.y,
                            backgroundColor: `hsl(${dot.h}, 50%, ${dot.l}%)`,
                            boxShadow: `0 0 ${dot.size}px 0 hsl(${dot.h}, 50%, ${dot.l}%)`,
                            width: `${dot.size}px`,
                            height: `${dot.size}px`,
                            borderRadius: "50%",
                            transform: `translateZ(${dot.z}px)`,
                            transformStyle: "preserve-3d",
                            // transition: "all 0.1s linear",
                        }}
                    ></div>
                )
            })}
            </div>
        </div>
    )
}
Perlin.defaultProps = {
    density: 6, width: 600, height: 300, zMax: 12
}
export default Perlin;