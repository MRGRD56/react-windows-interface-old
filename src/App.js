import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Window from "./components/Window/Window";
import Rectangle from "./models/Rectangle";
import Size from "./models/Size";
import Point from "./models/Point";

function App() {
    return (
        <div className="App">
            <Window title="Calculator" rectangle={new Rectangle(new Point(330, 30), new Size(350, 550))}/>
        </div>
    );
}

export default App;
