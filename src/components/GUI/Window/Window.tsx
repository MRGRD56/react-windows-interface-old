import React, {MouseEventHandler, useState} from "react";
import "./Window.scss";
import Rectangle from "../../../models/Rectangle";
import Size from "../../../models/Size";
import Point from "../../../models/Point";
import PropTypes from "prop-types";
import WindowTitle from "../WindowTitle/WindowTitle";
import Side from "../../../models/Side";
import WindowResizeBorders from "../WindowResizeBorders/WindowResizeBorders";
import {classes} from "../../../utilities/values";
import WindowProps from "./WindowProps";

function Window({title, x, y, width, height, minWidth, minHeight, isAcrylic,
    isMaximized, isMinimized, children, onFocused, isResizable, ...props}: WindowProps) {
    const [rectangle, setRectangle] = useState(
        new Rectangle(
            new Point(x ?? 0, y ?? 0),
            new Size(width ?? 300, height ?? 300)));

    const [state, setState] = useState({
        isMaximized: isMaximized ?? false,
        isMinimized: isMinimized ?? false,
        isAnimatedShort: false,
        isAnimatedNormal: false,
        isClosing: false,
        isClosed: false
    });

    function toggleIsMaximized() {
        const newState = {
            ...state,
            isAnimatedShort: true,
            isMaximized: state.isMaximized !== true
        };
        setState(newState);
        setTimeout(() => {
            setState({
                ...newState,
                isAnimatedShort: false
            });
        }, 75);
    }

    const [windowZIndex, setZIndex] = useState<number>();

    const onDrag = (e: any) => {
        const [x, y] = [e.movementX, e.movementY];
        setRectangle(new Rectangle(new Point(rectangle.point.x + x, rectangle.point.y + y), rectangle.size));
        if (state.isMaximized) {
            const titleButtonsWidth = 138;
            const xPosPercentage = e.clientX / (window.innerWidth - titleButtonsWidth);
            const newXPos = e.clientX - (rectangle.size.width - titleButtonsWidth) * xPosPercentage;
            console.log(xPosPercentage, newXPos);
            setRectangle(
                new Rectangle(
                    new Point(newXPos, 0),
                    rectangle.size));
            setState({
                ...state,
                isMaximized: false
            });
        }
    };

    const onDragStop = (e: any) => {
        if (!state.isMaximized && e.clientY <= 0) {
            toggleIsMaximized();
        }
        if (rectangle.point.y < 0) {
            setRectangle(new Rectangle(new Point(rectangle.point.x, 0), rectangle.size));
        }
    };

    function onResize(e: any, side: Side) {
        if (state.isMaximized) return;

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

        const newRectangle = new Rectangle(
            new Point(
                rectangle.point.x + pointIncrement.x,
                rectangle.point.y + pointIncrement.y
            ),
            new Size(
                rectangle.size.width + sizeIncrement.width,
                rectangle.size.height + sizeIncrement.height));

        //FIXME
        // if (pointIncrement.x !== 0 || pointIncrement.y !== 0) {
        //     if (newRectangle.size.width <= getMinSize().width) {
        //         console.log(rectangle, newRectangle);
        //         newRectangle.point.x = rectangle.point.x + Math.min(Math.abs(newRectangle.size.width - getMinSize().width), x);
        //     }
        //     if (newRectangle.size.height <= getMinSize().height) {
        //         newRectangle.point.y = rectangle.point.y;
        //     }
        // }

        setRectangle(newRectangle);
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
        if (rectangle.size.width < getMinSize().width
            || rectangle.size.height < getMinSize().height) {
            setRectangle(new Rectangle(
                rectangle.point,
                new Size(
                    Math.max(rectangle.size.width, getMinSize().width),
                    Math.max(rectangle.size.height, getMinSize().height))
            ));
        }
    }

    function onMouseDown() {
        onFocused?.(windowZIndex, setZIndex);
    }

    function onCloseClick() {
        const newState = {
            ...state,
            isAnimatedShort: true,
            isClosing: true
        };
        setState(newState);
        setTimeout(() => {
            setState({
                ...newState,
                isClosing: false,
                isClosed: true,
                isAnimatedShort: false
            });
        }, 75);
    }

    function onMinimizeClick() {
        const newState = {
            ...state,
            isMinimized: true,
            isAnimatedNormal: true
        };
        setState(newState);
        setTimeout(() => {
            setState({
                ...newState,
                isAnimatedNormal: false
            });
        }, 1000);
    }

    function getMinSize(): Size {
        return new Size(Math.max(minWidth ?? 0, 146), Math.max(minHeight ?? 0, 32));
    }

    return (
        <div {...props}
            className={"window " + classes({
                "acrylic": () => isAcrylic !== false,
                "maximized": () => state.isMaximized !== false,
                "minimized": () => state.isMinimized,
                "animated-short": () => state.isAnimatedShort,
                "animated-normal": () => state.isAnimatedNormal,
                "closing": () => state.isClosing,
                "closed": () => state.isClosed
            })}
            style={{...rectangle.style, minWidth: getMinSize().width, minHeight: getMinSize().height, zIndex: windowZIndex}}
            onMouseDown={onMouseDown}>
            <WindowResizeBorders onResize={onResize} onResizeStart={onResizeStart} onResizeStop={onResizeStop}/>
            <WindowTitle title={title} onDrag={onDrag} onDragStop={onDragStop}
                onMinimizeClick={onMinimizeClick} onMaximizeClick={toggleIsMaximized} onCloseClick={onCloseClick}/>
            <div className="window-content">
                {children}
            </div>
        </div>
    );
}

// Window.propTypes = {
//     title: PropTypes.string,
//     x: PropTypes.number,
//     y: PropTypes.number,
//     width: PropTypes.number,
//     height: PropTypes.number,
//     minWidth: PropTypes.number,
//     minHeight: PropTypes.number,
//     isAcrylic: PropTypes.bool,
//     isMaximized: PropTypes.bool,
//     children: PropTypes.any,
//     zIndex: PropTypes.number,
//     onFocused: PropTypes.func
// };

export default Window;