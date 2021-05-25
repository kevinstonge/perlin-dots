import { useState, useEffect, useCallback } from "react";
import generateDots from "../accessories/generateDots.js";
import noise from "noisejs";
function Perlin() {
    //need multiple maps?
    //perlin + sin wave to generate continuous stream of random disturbances?
    const [noiseMap, setNoiseMap] = useState({});
    const [dots, setDots] = useState(generateDots({xDots: 20, yDots: 20, width: 300, height: 300}));
    const updateDots = useCallback(() => {
        const newDots = [...dots].map(dot=>{
            return ({...dot, z: 10*noiseMap.simplex2(dot.x, dot.y)})
        });
        setDots(newDots);
    },[noiseMap]);
    useEffect(()=>{
        const _noiseMap = new noise.Noise();
        _noiseMap.seed(Math.random());
        setNoiseMap(_noiseMap);
    }, []);
    useEffect(()=>{
        noiseMap.seed &&  updateDots()
    }, [noiseMap]);
    return (
        <div 
            className="dot-container"
            style={{perspective: "600px"}}
        >
            <div className="dot plane" style={{transform: "rotateX(80deg)" }}>
            {dots.length > 0 && dots.map(dot=>{
                return(
                    <div
                        className="dot"
                        style={{position: "relative", left: dot.x, top: dot.y, backgroundColor: "red", width: "2px", height: "2px", borderRadius: "50%", transform: `translateZ(${dot.z*10}px)`}}
                    ></div>
                )
            })}
            </div>
        </div>
    )
}
export default Perlin;