import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Success extends Component<any> {
    private _closeButton: HTMLButtonElement;
    private _totalElement: HTMLElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);
        this._closeButton = container.querySelector('.order-success__close') as HTMLButtonElement;
        this._totalElement = container.querySelector('.order-success__description') as HTMLElement;

        this._closeButton.addEventListener('click', () => {
            this.events.emit('success:close');
        });
    }

    render(data: any): HTMLElement {
        if (data.total !== undefined && this._totalElement) {
            this._totalElement.textContent = `Списано ${data.total} синапсов`;
        }
        return this._container;
    }
}