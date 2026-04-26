import { Component } from "../base/Component";

export abstract class Card<T> extends Component<T> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this._title = container.querySelector('.card__title') as HTMLElement;
        this._price = container.querySelector('.card__price') as HTMLElement;
    }

    set title(value: string) {
        if (this._title) this._title.textContent = value;
    }

    set price(value: number | null) {
        if (this._price) {
            this._price.textContent = value !== null ? `${value} синапсов` : 'Цена не указана';
        }
    }
}