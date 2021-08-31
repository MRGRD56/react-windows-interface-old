import React, {useState} from "react";
import "./WindowTitle.scss";
import PropTypes from "prop-types";
import WindowTitleButton from "../WindowTitleButton/WindowTitleButton";
import {DraggableCore} from "react-draggable";

function WindowTitle({title, onDrag, onDragStart, onDragStop,
    isMaximized, onMinimizeClick, onMaximizeClick, onCloseClick, ...props}) {
    function onTitleDoubleClick(e) {
        onMaximizeClick(e);
    }

    return (
        <div className="window-title d-flex flex-row justify-content-between align-items-stretch" {...props}>
            <DraggableCore onDrag={onDrag} onStart={onDragStart} onStop={onDragStop} axis="both">
                <div className="ps-2 unselectable d-flex align-items-center" style={{fontSize: "0.95rem", flex: 1}}
                    onDoubleClick={onTitleDoubleClick}>
                    {title}
                </div>
            </DraggableCore>
            <div className="d-flex flex-nowrap">
                <WindowTitleButton onClick={onMinimizeClick}>
                    <i className="material-icons" style={{position: "relative", top: "-5px"}}>minimize</i>
                </WindowTitleButton>
                <WindowTitleButton onClick={onMaximizeClick}>
                    <i className="material-icons">crop_square</i>
                </WindowTitleButton>
                <WindowTitleButton isCloseButton={true} onClick={onCloseClick}>
                    <i className="material-icons">close</i>
                </WindowTitleButton>
            </div>
        </div>
    );
}

WindowTitle.propTypes = {
    title: PropTypes.string,
    onDrag: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragStop: PropTypes.func,
    isMaximized: PropTypes.bool,
    onMinimizeClick: PropTypes.func,
    onMaximizeClick: PropTypes.func,
    onCloseClick: PropTypes.func
};

export default WindowTitle;