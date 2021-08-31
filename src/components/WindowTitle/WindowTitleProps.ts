import {DraggableEventHandler} from "react-draggable";
import {MouseEventHandler} from "react";

export default interface WindowTitleProps {
    title?: string,
    onDrag?: DraggableEventHandler,
    onDragStart?: DraggableEventHandler,
    onDragStop?: DraggableEventHandler,
    isMaximized?: boolean,
    onMinimizeClick?: MouseEventHandler
    onMaximizeClick?: MouseEventHandler,
    onCloseClick?: MouseEventHandler
}