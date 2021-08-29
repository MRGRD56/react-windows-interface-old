import React, {useState} from "react";
import "./Window.scss";
import Rectangle from "../../models/Rectangle";
import Size from "../../models/Size";
import Point from "../../models/Point";
import PropTypes from "prop-types";
import WindowTitle from "../WindowTitle/WindowTitle";
import Draggable, {DraggableCore} from "react-draggable";

function Window(props) {
    let [rectangle, setRectangle] = useState(props.rectangle);

    function onDrag(e) {
        const [x, y] = [e.movementX, e.movementY];
        setRectangle(new Rectangle(new Point(rectangle.point.x + x, rectangle.point.y + y), rectangle.size));
    }

    function onDragStop() {
        if (rectangle.point.y < 0) {
            setRectangle(new Rectangle(new Point(rectangle.point.x, 0), rectangle.size));
        }
    }

    return (
        <div className="window d-flex flex-column position-absolute" style={rectangle.style}>
            <WindowTitle title={props.title} onDrag={onDrag} onDragStop={onDragStop}/>
        </div>
    );
}

Window.propTypes = {
    title: PropTypes.string,
    rectangle: PropTypes.instanceOf(Rectangle)
};

export default Window;