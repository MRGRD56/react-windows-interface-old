import React, {useState} from "react";
import GuiEnvironmentProps from "./GuiEnvironmentProps";
import WindowComponent from "../Window/WindowComponent";
import DebugWindow from "../../Programs/DebugWindow/DebugWindow";
import InternetBrowser from "../../Programs/InternetBrowser/InternetBrowser";
import "./GuiEnvironment.scss";
import DE from "../../../services/DE";
import DesktopEnvironment from "../../../services/models/DesktopEnvironment";
import Window from "../../../models/GUI/Window";
import Rectangle from "../../../models/Rectangle";
import Point from "../../../models/Point";
import Size from "../../../models/Size";
import WindowInterop from "../../../services/models/WindowInterop";
import DesktopEnvironmentContext from "../../../services/models/DesktopEnvironmentContext";

function GuiEnvironment(props: GuiEnvironmentProps): JSX.Element {
    function closeWindow(window: Window) {
        console.log("CLOSE", window.id);
        const windows = state.desktopEnvironment.windows.filter(w => w.id !== window.id);
        setState(new DesktopEnvironmentContext(windowInterop, setDE, new DesktopEnvironment(windows)));
    }

    function minimizeWindow(window: Window, isMinimized: boolean) {
        console.log("MINIMIZE", window.id, isMinimized);
    }

    function maximizeWindow(window: Window, isMaximized: boolean) {
        console.log("MAXIMIZE", window.id, isMaximized);
    }

    function addWindow(window: Window) {
        setState(new DesktopEnvironmentContext(windowInterop, setDE, new DesktopEnvironment(state.desktopEnvironment.windows.concat([window]))));
    }

    function createCloseWindow(window: Window) {
        return function () {
            closeWindow(window);
        };
    }

    function createMinimizeWindow(window: Window) {
        return function (isMinimized: boolean) {
            minimizeWindow(window, isMinimized);
        };
    }

    function createMaximizeWindow(window: Window) {
        return function (isMinimized: boolean) {
            maximizeWindow(window, isMinimized);
        };
    }

    const windowInterop: WindowInterop = new WindowInterop(
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        addWindow
    );

    function setDE(de: DesktopEnvironment) {
        setState(new DesktopEnvironmentContext(windowInterop, setDE, de));
    }

    const [state, setState] = useState(new DesktopEnvironmentContext(windowInterop, setDE,
        new DesktopEnvironment([
            new Window("Calculator",
                windowInterop,
                new Rectangle(new Point(30, 30), new Size(350, 550)),
                new Size(230, 32)),
            new Window("Online Color Picker by MRGRD56",
                windowInterop,
                new Rectangle(new Point(50, 50), new Size(500, 400)), undefined,
                (
                    <InternetBrowser/>
                )),
            new Window("⭐ Debug",
                windowInterop,
                Rectangle.getScreenCenter(new Size(250, 250)), undefined,
                (
                    <DebugWindow/>
                ))
        ])));

    let lastZIndex = 0;

    function onWindowFocused(windowZIndex: number, setZIndex: (zIndex: number) => void) {
        if (lastZIndex === windowZIndex) return;
        setZIndex(++lastZIndex);
    }

    return (
        <DE.Provider value={state}>
            <div className="App">
                {state.desktopEnvironment.windows.map(window => (
                    <WindowComponent
                        key={window.id}
                        windowInfo={window}
                        onFocused={onWindowFocused}
                        maximizeFunction={createMaximizeWindow(window)}
                        minimizeFunction={createMinimizeWindow(window)}
                        closeFunction={createCloseWindow(window)}>
                        {window.content && {...window.content, props: {...window.content.props, windowInfo: window}}}
                    </WindowComponent>
                ))}
                {/*<WindowComponent title="Calculator" minWidth={230} minHeight={32} x={30} y={30} width={350} height={550} onFocused={onWindowFocused}/>*/}
                {/*<WindowComponent title="Online Color Picker by MRGRD56" x={50} y={50} width={500} height={400} onFocused={onWindowFocused}>*/}
                {/*    <InternetBrowser/>*/}
                {/*</WindowComponent>*/}
                {/*<WindowComponent title="⭐ Debug" x={70} y={70} width={250} height={250} onFocused={onWindowFocused}>*/}
                {/*    <DebugWindow/>*/}
                {/*</WindowComponent>*/}
            </div>
        </DE.Provider>
    );
}

export default GuiEnvironment;