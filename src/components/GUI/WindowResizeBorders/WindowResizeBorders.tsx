import ResizeBorder from "../ResizeBorder/ResizeBorder";
import Side from "../../../models/Side";
import React from "react";
import PropTypes from "prop-types";
import "./WindowResizeBorders.scss";
import windowResizeBordersProps from "./WindowResizeBordersProps";

function WindowResizeBorders({onResize, onResizeStart, onResizeStop}: windowResizeBordersProps) {
    const resizeBorders = [
        {
            sideString: "t",
            side: Side.top
        },
        {
            sideString: "r",
            side: Side.right
        },
        {
            sideString: "b",
            side: Side.bottom
        },
        {
            sideString: "l",
            side: Side.left
        },
        {
            sideString: "tl",
            side: Side.top | Side.left
        },
        {
            sideString: "tr",
            side: Side.top | Side.right
        },
        {
            sideString: "bl",
            side: Side.bottom | Side.left
        },
        {
            sideString: "br",
            side: Side.bottom | Side.right
        }
    ];

    return (
        <div className="resize-borders-wrapper">
            {resizeBorders.map((rb, index) => (
                <ResizeBorder className={`resize-border resize-border-${rb.sideString}`}
                    key={index}
                    onDrag={e => onResize(e, rb.side)}
                    onDragStart={onResizeStart} onDragStop={onResizeStop}/>
            ))}
        </div>
    );
}

// WindowResizeBorders.propTypes = {
//     onResize: PropTypes.func,
//     onResizeStart: PropTypes.func,
//     onResizeStop: PropTypes.func
// };

export default WindowResizeBorders;