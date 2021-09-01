import {Observable, Subscriber} from "rxjs";
import Rectangle from "../Rectangle";
import Point from "../Point";
import Size from "../Size";
import WindowInterop from "../../services/models/WindowInterop";

export default class Window {
    private static idCounter = 0;

    constructor(
        title: string,
        private readonly windowInterop: WindowInterop,
        public rectangle: Rectangle = undefined,
        public minSize: Size = undefined,
        public content: JSX.Element = undefined) {

        this.id = ++Window.idCounter;
        this.title = title;
        if (rectangle == null) {
            rectangle = new Rectangle(new Point(30, 30), new Size(400, 400));
        }
    }

    public readonly id: number;

    get isMinimized(): boolean {
        return this._isMinimized;
    }
    set isMinimized(value: boolean) {
        this._isMinimized = value;
        this.windowInterop.minimizeFunction(this, value);
        this.isMinimizedChangedSubscriber.next(value);
    }

    get isMaximized(): boolean {
        return this._isMaximized;
    }
    set isMaximized(value: boolean) {
        this._isMaximized = value;
        this.windowInterop.maximizeFunction(this, value);
        this.isMaximizedChangedSubscriber.next(value);
    }
    // private _title: string;
    // public get title() {
    //     return this._title;
    // }
    // public set title(value) {
    //     this._title = value;
    //     this.titleChangedSub.next(value);
    // }
    //

    title: string;
    private _isMaximized: boolean;
    private _isMinimized: boolean;
    isAcrylic: boolean;

    private _isClosed: boolean;
    public get isClosed(): boolean {
        return this._isClosed;
    }

    private isMaximizedChangedSubscriber: Subscriber<boolean>;
    public readonly isMaximizedChanged: Observable<boolean> = new Observable<boolean>(subscriber => {
        this.isMaximizedChangedSubscriber = subscriber;
    });
    
    private isMinimizedChangedSubscriber: Subscriber<boolean>;
    public readonly isMinimizedChanged: Observable<boolean> = new Observable<boolean>(subscriber => {
        this.isMinimizedChangedSubscriber = subscriber;
    });

    private closingSubscriber: Subscriber<void>;
    public readonly closing: Observable<void> = new Observable<void>(subscriber => {
        this.closingSubscriber = subscriber;
    });

    private closedSubscriber: Subscriber<void>;
    public readonly closed: Observable<void> = new Observable<void>(subscriber => {
        this.closedSubscriber = subscriber;
    });

    close(): void {
        this.closingSubscriber.next();

        this.windowInterop.closeFunction(this);
        this._isClosed = true;

        this.closedSubscriber.next();
    }
}