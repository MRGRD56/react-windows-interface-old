export default interface WindowProps {
    title?: string,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    minWidth?: number,
    minHeight?: number,
    isAcrylic?: boolean,
    isMaximized?: boolean,
    isMinimized?: boolean,
    children?: JSX.Element,
    zIndex?: number,
    isResizable?: boolean,
    onFocused?: (windowZIndex: number, setZIndex: (zIndex: number) => void) => void
}