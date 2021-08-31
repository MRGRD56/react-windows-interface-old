import {DraggableEventHandler} from "react-draggable";

export default interface ResizeBorderProps {
    onDrag?: DraggableEventHandler,
    onDragStart?: DraggableEventHandler,
    onDragStop?: DraggableEventHandler,
    children?: any,
    className: string
}