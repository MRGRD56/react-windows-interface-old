import React from "react";
import PropTypes from "prop-types";
import "./WindowTitleButton.scss";

function WindowTitleButton({children, isCloseButton, onClick, ...props}) {
    return (
        <button className={"window-title-btn unselectable" + (isCloseButton ? " win-close-btn" : "")} onClick={onClick} {...props}>
            {children}
        </button>
    );
}

WindowTitleButton.propTypes = {
    children: PropTypes.any,
    isCloseButton: PropTypes.bool,
    onClick: PropTypes.func
};

export default WindowTitleButton;