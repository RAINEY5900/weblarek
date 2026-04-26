import { Card } from "./Card";

export class CardCart extends Card<any> {
    private _index: HTMLElement;
    private _deleteButton: HTMLButtonElement;
    onClickRemove: () => void = () => {};

    constructor(container: HTMLElement) {
        super(container);
        this._index = container.querySelector('.basket__item-index') as HTMLElement;
        this._deleteButton = container.querySelector('.card__button') as HTMLButtonElement;
        
        this._deleteButton.addEventListener('click', () => {
            this.onClickRemove();
        });
    }

    render(data: any): HTMLElement {
        this.title = data.title;
        this.price = data.price;
        if (this._index && data.index) {
            this._index.textContent = String(data.index);
        }
        return this._container;
    }
}