import {Observable, Subscriber} from "rxjs";

export default class Window {
    private _title: string;
    public get title() {
        return this._title;
    }
    public set title(value) {
        this._title = value;
        this.titleChangedSub.next(value);
    }

    private titleChangedSub: Subscriber<string>;
    public readonly titleChanged: Observable<string> = new Observable<string>(subscriber => {
        this.titleChangedSub = subscriber;
    })
}