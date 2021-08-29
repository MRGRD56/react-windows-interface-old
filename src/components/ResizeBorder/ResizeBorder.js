import React from "react";
import PropTypes from "prop-types";
import {DraggableCore} from "react-draggable";

function ResizeBorder({onDrag, onDragStart, onDragStop, children, ...props}) {
    return (
        <DraggableCore onDrag={onDrag} onStart={onDragStart} onStop={onDragStop}>
            <div {...props}>
                {children}
            </div>
        </DraggableCore>
    );
}

ResizeBorder.propTypes = {
    onDrag: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragStop: PropTypes.func,
    children: PropTypes.any
};

export default ResizeBorder;