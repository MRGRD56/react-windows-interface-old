import React, {useState} from "react";
import "./Window.scss";
import Rectangle from "../../models/Rectangle";
import Size from "../../models/Size";
import Point from "../../models/Point";
import PropTypes from "prop-types";

function Window(props) {
    let [rectangle, setRectangle] = useState(props.rectangle);

    return (
        <div className="calc-window d-flex position-absolute" style={rectangle.style}>

        </div>
    );
}

Window.propTypes = {
    title: PropTypes.string,
    rectangle: PropTypes.instanceOf(Rectangle)
};

export default Window;