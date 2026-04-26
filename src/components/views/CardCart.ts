import { Card } from "./Card";

export class CardCart extends Card<any> {
    private _index: HTMLElement;
    private _deleteButton: HTMLButtonElement;
    onClickRemove: () => void = () => {};

    constructor(container: HTMLElement) {
        super(container);
        this._index = container.querySelector('.basket__item-index') as HTMLElement;
        this._deleteButton = container.querySelector('.card__button') as HTMLButtonElement;
        
        this._deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.onClickRemove();
        });
    }

    set index(value: number) {
        if (this._index) {
            this._index.textContent = String(value);
        }
    }

    render(data: { title: string; price: number | null; index: number }): HTMLElement {
        this.title = data.title;
        this.price = data.price;
        this.index = data.index;
        return this._container;
    }
}