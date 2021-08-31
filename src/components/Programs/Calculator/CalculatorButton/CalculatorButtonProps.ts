import {MouseEventHandler} from "react";

export default interface CalculatorButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>,
    bgColor: string,
    children: any
}