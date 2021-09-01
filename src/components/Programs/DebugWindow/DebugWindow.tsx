import React, {useContext} from "react";
import DE from "../../../services/DE";
import Rectangle from "../../../models/Rectangle";

function DebugWindow() {
    const de = useContext(DE);
    const window = de.getWindowById(6);
    console.log(window.title);

    function createNewWindow() {
        de.addWindow("New window",
            Rectangle.defaultWindowRectangle,
            undefined,
            (
                <div>
                    HELLO {Date.now()}
                </div>
            )
        );
    }

    return (
        <div className="p-1 d-flex flex-wrap">
            <button onClick={createNewWindow}>Create new window</button>
            <button>Close Notepad</button>
            <button>Center this window</button>
        </div>
    );
}

export default DebugWindow;