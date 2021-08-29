import React, {useState} from "react";
import "./Window.scss";
import Rectangle from "../../models/Rectangle";
import Size from "../../models/Size";
import Point from "../../models/Point";
import PropTypes from "prop-types";
import WindowTitle from "../WindowTitle/WindowTitle";
import Draggable, {DraggableCore} from "react-draggable";
import ResizeBorder from "../ResizeBorder/ResizeBorder";
import Side from "../../models/Side";

function Window(props) {
    let [rectangle, setRectangle] = useState(
        new Rectangle(
            new Point(props.x ?? 0, props.y ?? 0),
            new Size(props.width ?? 300, props.height ?? 300)));

    function onDrag(e) {
        const [x, y] = [e.movementX, e.movementY];
        setRectangle(new Rectangle(new Point(rectangle.point.x + x, rectangle.point.y + y), rectangle.size));
    }

    function onDragStop() {
        if (rectangle.point.y < 0) {
            setRectangle(new Rectangle(new Point(rectangle.point.x, 0), rectangle.size));
        }
    }

    function onResize(e) {
        setRectangle(new Rectangle(rectangle.point, new Size(rectangle.size.width + e.movementX, rectangle.size.height + e.movementY)));
    }

    let isResizing = false;

    function onResizeStart() {
        isResizing = true;
    }

    function onResizeStop() {
        isResizing = false;
    }

    return (
        <div className={`window${props.isAcrylic !== false ? " acrylic" : ""} d-flex flex-column position-absolute`}
            style={rectangle.style}>
            <div className="resize-borders-wrapper">
                <ResizeBorder className="resize-border resize-border-t" onDrag={e => onResize(e, Side.top)}
                    onDragStart={onResizeStart} onDragStop={onResizeStop}/>
                <ResizeBorder className="resize-border resize-border-r" onDrag={e => onResize(e, Side.right)}
                    onDragStart={onResizeStart} onDragStop={onResizeStop}/>
                <ResizeBorder className="resize-border resize-border-b" onDrag={e => onResize(e, Side.bottom)}
                    onDragStart={onResizeStart} onDragStop={onResizeStop}/>
                <ResizeBorder className="resize-border resize-border-l" onDrag={e => onResize(e, Side.left)}
                    onDragStart={onResizeStart} onDragStop={onResizeStop}/>
                <ResizeBorder className="resize-border resize-border-tl" onDrag={e => onResize(e, Side.top | Side.left)}
                    onDragStart={onResizeStart} onDragStop={onResizeStop}/>
                <ResizeBorder className="resize-border resize-border-tr" onDrag={e => onResize(e, Side.top | Side.right)}
                    onDragStart={onResizeStart} onDragStop={onResizeStop}/>
                <ResizeBorder className="resize-border resize-border-br" onDrag={e => onResize(e, Side.bottom | Side.left)}
                    onDragStart={onResizeStart} onDragStop={onResizeStop}/>
                <ResizeBorder className="resize-border resize-border-bl" onDrag={e => onResize(e, Side.bottom | Side.right)}
                    onDragStart={onResizeStart} onDragStop={onResizeStop}/>
            </div>
            <WindowTitle title={props.title} onDrag={onDrag} onDragStop={onDragStop}/>
        </div>
    );
}

Window.propTypes = {
    title: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    isAcrylic: PropTypes.bool
};

export default Window;