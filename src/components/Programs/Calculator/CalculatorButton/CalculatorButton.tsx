import React from "react";
import "./CalculatorButton.scss";
import CalculatorButtonProps from "./CalculatorButtonProps";

function CalculatorButton(props: CalculatorButtonProps) {
    return (
        <button className="calc-btn" style={{backgroundColor: props.bgColor}} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

// CalculatorButton.propTypes = {
//     onClick: PropTypes.func,
//     bgColor: PropTypes.string,
//     children: PropTypes.any
// };

export default CalculatorButton;