import { Card } from './Card';

interface ICardCartData {
    title: string;
    price: number | null;
    index: number;
}

export class CardCart extends Card<ICardCartData> {
    private _index: HTMLElement;
    private _deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, private onRemoveHandler: () => void) {
        super(container);
        this._index = container.querySelector('.basket__item-index') as HTMLElement;
        this._deleteButton = container.querySelector('.basket__item-delete') as HTMLButtonElement;
        
        if (this._deleteButton) {
            this._deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.onRemoveHandler();
            });
        }
    }

    set index(value: number) {
        if (this._index) {
            this._index.textContent = String(value);
        }
    }
}