import React from "react";
import DesktopEnvironment from "./models/DesktopEnvironment";

const DE = React.createContext(new DesktopEnvironment());

export default DE;