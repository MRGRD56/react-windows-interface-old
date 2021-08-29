import React, {useState} from "react";
import "./Window.scss";
import Rectangle from "../../models/Rectangle";
import Size from "../../models/Size";
import Point from "../../models/Point";
import PropTypes from "prop-types";
import WindowTitle from "../WindowTitle/WindowTitle";

function Window(props) {
    let [rectangle, setRectangle] = useState(props.rectangle);

    return (
        <div className="window d-flex flex-column position-absolute" style={rectangle.style}>
            <WindowTitle title={props.title}/>
        </div>
    );
}

Window.propTypes = {
    title: PropTypes.string,
    rectangle: PropTypes.instanceOf(Rectangle)
};

export default Window;