import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class CartView extends Component<void> {
    private _listElement: HTMLElement;
    private _totalElement: HTMLElement;
    private _buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);
        this._listElement = container.querySelector('.basket__list') as HTMLElement;
        this._totalElement = container.querySelector('.basket__price') as HTMLElement;
        this._buttonElement = container.querySelector('.basket__button') as HTMLButtonElement;
        
        this._buttonElement.disabled = true;
        
        this._buttonElement.addEventListener('click', () => {
            this.events.emit('order:open');
        });
    }

    get container(): HTMLElement {
        return this._container;
    }

    set items(elements: HTMLElement[]) {
        if (this._listElement) {
            this._listElement.replaceChildren(...elements);
        }
    }

    set total(value: number) {
        if (this._totalElement) {
            this._totalElement.textContent = `${value} синапсов`;
        }
    }

    set disabled(value: boolean) {
        if (this._buttonElement) {
            this._buttonElement.disabled = value;
        }
    }
}