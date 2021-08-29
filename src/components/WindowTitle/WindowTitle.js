import React from "react";
import "./WindowTitle.scss";
import PropTypes from "prop-types";
import WindowTitleButton from "../WindowTitleButton/WindowTitleButton";

function WindowTitle(props) {
    return (
        <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="ms-2 unselectable">{props.title}</div>
            <div className="d-flex flex-nowrap">
                <WindowTitleButton>
                    <i className="material-icons" style={{position: "relative", top: "-5px"}}>minimize</i>
                </WindowTitleButton>
                <WindowTitleButton>
                    <i className="material-icons">crop_square</i>
                </WindowTitleButton>
                <WindowTitleButton isCloseButton={true}>
                    <i className="material-icons">close</i>
                </WindowTitleButton>
            </div>
        </div>
    );
}

WindowTitle.propTypes = {
    title: PropTypes.string
};

export default WindowTitle;