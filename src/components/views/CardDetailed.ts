import { CardCatalog } from "./CardCatalog";

export class CardDetailed extends CardCatalog {
    private _description: HTMLElement;
    private _button: HTMLButtonElement;
    onClick: () => void = () => {};

    constructor(container: HTMLElement) {
        super(container);
        this._description = container.querySelector('.card__text') as HTMLElement;
        this._button = container.querySelector('.card__button') as HTMLButtonElement;
        
        this._button.addEventListener('click', () => {
            this.onClick();
        });
    }

    render(data: any): HTMLElement {
        super.render(data);
        if (this._description && data.description) {
            this._description.textContent = data.description;
        }
        if (this._button) {
            if (!data.isAvailable) {
                this._button.disabled = true;
                this._button.textContent = 'Недоступно';
            } else if (data.isInCart) {
                this._button.textContent = 'Убрать из корзины';
            } else {
                this._button.textContent = 'В корзину';
            }
        }
        return this._container;
    }
}