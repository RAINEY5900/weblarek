import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Header extends Component<any> {
    private _cartButton: HTMLElement;
    private _counter: HTMLElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);
        this._cartButton = container.querySelector('.header__cart') as HTMLElement;
        this._counter = container.querySelector('.header__cart-counter') as HTMLElement;

        this._cartButton.addEventListener('click', () => {
            this.events.emit('cart:opened');
        });
    }

    render(data: any): HTMLElement {
        if (data.count !== undefined && this._counter) {
            this._counter.textContent = String(data.count);
        }
        return this._container;
    }
}