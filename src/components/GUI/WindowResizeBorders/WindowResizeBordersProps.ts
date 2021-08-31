import {DraggableEventHandler} from "react-draggable";
import Side from "../../../models/Side";

export default interface windowResizeBordersProps {
    onResize?: (e: any, side: Side) => void,
    onResizeStart?: DraggableEventHandler,
    onResizeStop?: DraggableEventHandler
}