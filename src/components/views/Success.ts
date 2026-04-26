import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

interface ISuccessData {
    total: number;
}

export class Success extends Component<ISuccessData> {
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

    get container(): HTMLElement {
        return this._container;
    }

    set total(value: number) {
        if (this._totalElement) {
            this._totalElement.textContent = `Списано ${value} синапсов`;
        }
    }

    render(data: ISuccessData): HTMLElement {
        this.total = data.total;
        return this._container;
    }
}