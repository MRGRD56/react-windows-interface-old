import React from "react";
import PropTypes from "prop-types";
import "./WindowTitleButton.scss";

function WindowTitleButton({children, isCloseButton, ...props}) {
    return (
        <button className={"window-title-btn unselectable" + (isCloseButton ? " win-close-btn" : "")} {...props}>
            {children}
        </button>
    );
}

WindowTitleButton.propTypes = {
    children: PropTypes.any,
    isCloseButton: PropTypes.bool
};

export default WindowTitleButton;