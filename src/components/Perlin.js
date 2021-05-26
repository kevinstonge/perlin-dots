import { useReducer, useEffect } from "react";
import generateDots from "../accessories/generateDots.js";
import useInterval from "../accessories/useInterval.js";
import noise from "noisejs";
function Perlin(props) {
    const { xDots, yDots, width, height } = props;
    const initialState = {
        noiseMap: new noise.Noise(Math.random()),
        colorMap: new noise.Noise(Math.random()),
        xoff: 0,
        yoff: 0,
        dots: generateDots({ xDots, yDots, width, height }),
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case "UPDATE_DOTS":
                const newState = { ...state };
                newState.dots = [...newState.dots].map(dot => {
                    const z = 12 * state.noiseMap.simplex2((dot.x + state.xoff) / 100, (dot.y + state.yoff) / 100);
                    return ({
                        ...dot,
                        z,
                        h: Math.floor(359 * Math.abs(state.colorMap.simplex2(z/10, 0)))
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
                perspective: "500px",
                width: `${width}px`,
                height: `${height}px`
            }}
        >
            <div className="dot plane" style={{
                position: "absolute",
                top: "50%",
                left: "0%",
                transform: "rotate3d(1, 0, 0, 70deg) translateY(100px)",
                transformStyle: "preserve-3d"
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
                            backgroundColor: `hsl(${dot.h}, 50%, 75%)`,
                            boxShadow: `0 0 3px 0 hsl(${dot.h}, 50%, 75%)`,
                            width: "2px",
                            height: "2px",
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
    xDots: 40, yDots: 20, width: 800, height: 400 
}
export default Perlin;