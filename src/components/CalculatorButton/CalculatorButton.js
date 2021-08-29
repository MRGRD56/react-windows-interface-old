import React from "react";
import PropTypes from "prop-types";
import "./CalculatorButton.scss";

function CalculatorButton(props) {
    return (
        <button className="calc-btn" style={{backgroundColor: props.bgColor}} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

CalculatorButton.propTypes = {
    onClick: PropTypes.func,
    bgColor: PropTypes.string,
    children: PropTypes.any
};

export default CalculatorButton;