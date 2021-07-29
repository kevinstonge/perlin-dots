import { useState, useEffect } from "react";
function Sound(props) {
    const [state, setState] = useState({
        context: null,
        oscillator: null,
        gain: null,
    })
    const playPauseHandler = () => {
        (state.context === null) ? playSound() : pauseSound();
    }
    const playSound = () => {
        setState({ ...state, context: new AudioContext() });
    }
    const pauseSound = () => {
        state.context.stop(0);
        setState({...state, context: null})
    }
    useEffect(() => {
        if (state.context !== null) {
            const context = state.context;
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            oscillator.connect(gain);
            oscillator.frequency.value = 432 / 2;
            oscillator.frequency.linearRampToValueAtTime(432, context.currentTime + 2);
            gain.connect(context.destination);
            gain.gain.value = 0.1;
            // oscillator.type = "sawtooth";
            oscillator.start(0);
            oscillator.stop(3);
        }
    },[state.context])
    return (
        <button onClick={()=>playPauseHandler()}>play sound</button>
    );
}
export default Sound;