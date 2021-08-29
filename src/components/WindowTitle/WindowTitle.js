import React from "react";
import "./WindowTitle.scss";
import PropTypes from "prop-types";

function WindowTitle(props) {
    return (
        <div className="d-flex justify-content-between">
            <div>{props.title}</div>
            <div>
                <button/>
                <button/>
                <button/>
            </div>
        </div>
    );
}

WindowTitle.propTypes = {
    title: PropTypes.string
};

export default WindowTitle;