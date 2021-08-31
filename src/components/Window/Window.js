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
import WindowResizeBorders from "../WindowResizeBorders/WindowResizeBorders";
import {classes} from "../../utilities/values";
import useForceUpdate from "../../hooks/useForceUpdate";

function Window(props) {
    const [rectangle, setRectangle] = useState(
        new Rectangle(
            new Point(props.x ?? 0, props.y ?? 0),
            new Size(props.width ?? 300, props.height ?? 300)));

    const [state, setState] = useState({
        isMaximized: props.isMaximized ?? false,
        isAnimated: false
    });

    function toggleIsMaximized() {
        const newState = {
            ...state,
            isAnimated: true,
            isMaximized: state.isMaximized !== true
        };
        setState(newState);
        setTimeout(() => {
            setState({
                ...newState,
                isAnimated: false
            });
        }, 75);
    }

    const [lastDragEvent, setLastDragEvent] = useState();

    const onDrag = e => {
        if (state.isMaximized) {
            return;
        }

        const [x, y] = [e.movementX, e.movementY];
        setRectangle(new Rectangle(new Point(rectangle.point.x + x, rectangle.point.y + y), rectangle.size));
        if (e) {
            setLastDragEvent(e);
        }
    };

    const onDragStop = () => {
        console.log(lastDragEvent);
        if (!state.isMaximized && lastDragEvent && lastDragEvent.clientY <= 0) {
            toggleIsMaximized();
        }
        if (rectangle.point.y < 0) {
            setRectangle(new Rectangle(new Point(rectangle.point.x, 0), rectangle.size));
        }
    };

    function onResize(e, side) {
        if (state.isMaximized) {
            return;
        }

        const [isTop, isRight, isBottom, isLeft] = [
            (side & Side.top) === Side.top,
            (side & Side.right) === Side.right,
            (side & Side.bottom) === Side.bottom,
            (side & Side.left) === Side.left
        ];

        let [x, y] = [e.movementX, e.movementY];
        const sizeIncrement = new Size(0, 0);
        const pointIncrement = new Point(0, 0);

        if (!(isTop && isRight
            || isRight && isBottom
            || isBottom && isLeft
            || isLeft && isTop)) {
            if (isTop || isBottom) {
                x = 0;
            }
            if (isLeft || isRight) {
                y = 0;
            }
        }

        //Right, Bottom or Bottom-Right
        if (isBottom && !isLeft || isRight && !isTop) {
            sizeIncrement.width = x;
            sizeIncrement.height = y;
        }
        //Top, Left or Top-Left
        else if (isTop && !isRight || isLeft && !isBottom) {
            pointIncrement.x = x;
            pointIncrement.y = y;
            sizeIncrement.width = -x;
            sizeIncrement.height = -y;
        }
        //Top-Right
        else if (isTop && isRight) {
            pointIncrement.y = y;
            sizeIncrement.height = -y;
            sizeIncrement.width = x;
        }
        //Bottom-Left
        else if (isBottom && isLeft) {
            pointIncrement.x = x;
            sizeIncrement.width = -x;
            sizeIncrement.height = y;
        }

        setRectangle(
            new Rectangle(
                new Point(
                    rectangle.point.x + pointIncrement.x,
                    rectangle.point.y + pointIncrement.y
                ),
                new Size(
                    rectangle.size.width + sizeIncrement.width,
                    rectangle.size.height + sizeIncrement.height)));
    }

    let isResizing = false;

    function onResizeStart() {
        isResizing = true;
    }

    function onResizeStop() {
        isResizing = false;
        if (rectangle.point.y < 0) {
            setRectangle(
                new Rectangle(
                    new Point(
                        rectangle.point.x,
                        0),
                    new Size(
                        rectangle.size.width,
                        rectangle.size.height + rectangle.point.y)));
        }
    }

    return (
        <div
            className={"window " + classes({
                "acrylic": () => props.isAcrylic !== false,
                "maximized": () => state.isMaximized !== false,
                "animated": () => state.isAnimated
            })}
            style={rectangle.style}>
            <WindowResizeBorders onResize={onResize} onResizeStart={onResizeStart} onResizeStop={onResizeStop}/>
            <WindowTitle title={props.title} onDrag={onDrag} onDragStop={onDragStop}
                onMaximizeClick={toggleIsMaximized}/>
        </div>
    );
}

Window.propTypes = {
    title: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    isAcrylic: PropTypes.bool,
    isMaximized: PropTypes.bool
};

export default Window;