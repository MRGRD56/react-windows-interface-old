import React from "react";
import "./App.scss";
import Window from "./components/Window/Window";

function App() {
    let lastZIndex = 0;

    function onWindowFocused(windowZIndex, setZIndex) {
        if (lastZIndex === windowZIndex) return;
        setZIndex(++lastZIndex);
    }

    return (
        <div className="App">
            <Window title="Calculator" minWidth={230} minHeight={32} x={30} y={30} width={350} height={550} onFocused={onWindowFocused}/>
            <Window title="Notepad" x={50} y={50} width={500} height={400} onFocused={onWindowFocused}/>
        </div>
    );
}

export default App;
