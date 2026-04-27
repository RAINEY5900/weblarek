import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

interface IHeaderData {
    count: number;
}

export class Header extends Component<IHeaderData> {
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

    set count(value: number) {
        if (this._counter) {
            this._counter.textContent = String(value);
        }
    }
}