import React from "react";
import GuiEnvironmentProps from "./GuiEnvironmentProps";
import Window from "../Window/Window";
import DebugWindow from "../../Programs/DebugWindow/DebugWindow";
import InternetBrowser from "../../Programs/InternetBrowser/InternetBrowser";

function GuiEnvironment(props: GuiEnvironmentProps) {
    let lastZIndex = 0;

    function onWindowFocused(windowZIndex: number, setZIndex: (zIndex: number) => void) {
        if (lastZIndex === windowZIndex) return;
        setZIndex(++lastZIndex);
    }

    return (
        <div className="App">
            <Window title="Calculator" minWidth={230} minHeight={32} x={30} y={30} width={350} height={550} onFocused={onWindowFocused}/>
            <Window title="Online Color Picker by MRGRD56" x={50} y={50} width={500} height={400} onFocused={onWindowFocused}>
                <InternetBrowser/>
            </Window>
            <Window title="⭐ Debug" x={70} y={70} width={250} height={250} onFocused={onWindowFocused}>
                <DebugWindow/>
            </Window>
        </div>
    );
}

export default GuiEnvironment;