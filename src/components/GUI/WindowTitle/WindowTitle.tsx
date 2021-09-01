import React, {MouseEventHandler, useState} from "react";
import "./WindowTitle.scss";
import PropTypes from "prop-types";
import WindowTitleButton from "../WindowTitleButton/WindowTitleButton";
import {DraggableCore} from "react-draggable";
import WindowTitleProps from "./WindowTitleProps";
import windowMinimize from "../../../assets/img/icons/window_minimize.svg";
import windowMaximizeNormal from "../../../assets/img/icons/window_maximize_normal.svg";
import windowMaximizeMaximized from "../../../assets/img/icons/window_maximize_maximized.svg";
import windowClose from "../../../assets/img/icons/window_close.svg";

function WindowTitle({title, onDrag, onDragStart, onDragStop,
    isMaximized, onMinimizeClick, onMaximizeClick, onCloseClick, ...props}: WindowTitleProps) {
    return (
        <div className="window-title d-flex flex-row justify-content-between align-items-stretch" {...props}>
            <DraggableCore onDrag={onDrag} onStart={onDragStart} onStop={onDragStop}>
                <div className="ps-2 unselectable d-flex align-items-center window-title-text"
                    onDoubleClick={onMaximizeClick}>
                    {title}
                </div>
            </DraggableCore>
            <div className="d-flex flex-nowrap">
                <WindowTitleButton onClick={onMinimizeClick}>
                    <i className="material-icons">
                        <img src={windowMinimize} width={10} height={10}/>
                    </i>
                </WindowTitleButton>
                <WindowTitleButton onClick={onMaximizeClick}>
                    <i className="material-icons">
                        {isMaximized
                            ? <img src={windowMaximizeMaximized} width={10} height={10}/>
                            : <img src={windowMaximizeNormal} width={10} height={10}/>}
                    </i>
                </WindowTitleButton>
                <WindowTitleButton isCloseButton={true} onClick={onCloseClick}>
                    <i className="material-icons">
                        <img src={windowClose} width={10} height={10}/>
                    </i>
                </WindowTitleButton>
            </div>
        </div>
    );
}

// WindowTitle.propTypes = {
//     title: PropTypes.string,
//     onDrag: PropTypes.func,
//     onDragStart: PropTypes.func,
//     onDragStop: PropTypes.func,
//     isMaximized: PropTypes.bool,
//     onMinimizeClick: PropTypes.func,
//     onMaximizeClick: PropTypes.func,
//     onCloseClick: PropTypes.func
// };

export default WindowTitle;