import Window from "../../../models/GUI/Window";

export default interface WindowComponentProps {
    // title?: string,
    // x?: number,
    // y?: number,
    // width?: number,
    // height?: number,
    // minWidth?: number,
    // minHeight?: number,
    // isAcrylic?: boolean,
    windowInfo: Window,
    isMaximized?: boolean,
    isMinimized?: boolean,
    children?: JSX.Element,
    zIndex?: number,
    isResizable?: boolean,
    onFocused?: (windowZIndex: number, setZIndex: (zIndex: number) => void) => void,
    closeFunction?: () => void,
    minimizeFunction?: (isMinimized: boolean) => void,
    maximizeFunction?: (isMaximized: boolean) => void
}