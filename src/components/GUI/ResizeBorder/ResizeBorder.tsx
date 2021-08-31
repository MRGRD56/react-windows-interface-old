import React from "react";
import {DraggableCore} from "react-draggable";
import ResizeBorderProps from "./ResizeBorderProps";

function ResizeBorder({onDrag, onDragStart, onDragStop, children, className, ...props}: ResizeBorderProps) {
    return (
        <DraggableCore onDrag={onDrag} onStart={onDragStart} onStop={onDragStop}>
            <div {...props} className={className}>
                {children}
            </div>
        </DraggableCore>
    );
}

// ResizeBorder.propTypes = {
//     onDrag: PropTypes.func,
//     onDragStart: PropTypes.func,
//     onDragStop: PropTypes.func,
//     children: PropTypes.any
// };

export default ResizeBorder;