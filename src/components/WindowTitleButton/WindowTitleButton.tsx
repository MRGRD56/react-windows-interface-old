import React from "react";
import "./WindowTitleButton.scss";
import WindowTitleButtonProps from "./WindowTitleButtonProps";

function WindowTitleButton({children, isCloseButton, onClick, ...props}: WindowTitleButtonProps) {
    return (
        <button className={"window-title-btn unselectable" + (isCloseButton ? " win-close-btn" : "")} onClick={onClick} {...props}>
            {children}
        </button>
    );
}

// WindowTitleButton.propTypes = {
//     children: PropTypes.any,
//     isCloseButton: PropTypes.bool,
//     onClick: PropTypes.func
// };

export default WindowTitleButton;