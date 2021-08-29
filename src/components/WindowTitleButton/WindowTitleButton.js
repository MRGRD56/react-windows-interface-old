import React from "react";
import PropTypes from "prop-types";
import "./WindowTitleButton.scss";

function WindowTitleButton(props) {
    return (
        <button className={"window-title-btn" + props.isCloseButton ? "win-close-btn" : ""} {...props}>
            {props.children}
        </button>
    );
}

WindowTitleButton.propTypes = {
    children: PropTypes.any,
    isCloseButton: PropTypes.bool
};

export default WindowTitleButton;