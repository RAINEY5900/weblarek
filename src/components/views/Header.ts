import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Header extends Component<any> {
    private _cartButton: HTMLElement | null;
    private _counter: HTMLElement | null;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);
        this._cartButton = container.querySelector('.header__basket');
        this._counter = container.querySelector('.header__basket-counter');
        
        if (this._cartButton) {
            this._cartButton.addEventListener('click', () => {
                this.events.emit('cart:opened');
            });
        }
    }

    render(data: { count: number }): HTMLElement {
        if (this._counter && data.count !== undefined) {
            this._counter.textContent = String(data.count);
        }
        return this._container;
    }
}