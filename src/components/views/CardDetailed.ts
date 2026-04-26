import { CardCatalog } from "./CardCatalog";

export class CardDetailed extends CardCatalog {
    private _description: HTMLElement;
    private _button: HTMLButtonElement;
    private _isInCart: boolean = false;
    private _isAvailable: boolean = true;
    onClick: () => void = () => {};

    constructor(container: HTMLElement) {
        super(container);
        this._description = container.querySelector('.card__text') as HTMLElement;
        this._button = container.querySelector('.card__button') as HTMLButtonElement;
        
        this._button.addEventListener('click', () => {
            this.onClick();
        });
    }

    set description(value: string) {
        if (this._description && value) {
            this._description.textContent = value;
        }
    }

    set isInCart(value: boolean) {
        this._isInCart = value;
        this.updateButton();
    }

    set isAvailable(value: boolean) {
        this._isAvailable = value;
        this.updateButton();
    }

    private updateButton(): void {
        if (!this._button) return;
        if (!this._isAvailable) {
            this._button.disabled = true;
            this._button.textContent = 'Недоступно';
        } else if (this._isInCart) {
            this._button.disabled = false;
            this._button.textContent = 'Убрать из корзины';
        } else {
            this._button.disabled = false;
            this._button.textContent = 'В корзину';
        }
    }

    render(data: { id?: string; title?: string; price?: number | null; image?: string; category?: string; description?: string; isInCart?: boolean; isAvailable?: boolean }): HTMLElement {
        if (data.id !== undefined) this.id = data.id;
        if (data.title !== undefined) this.title = data.title;
        if (data.price !== undefined) this.price = data.price;
        if (data.image !== undefined) this.image = data.image;
        if (data.category !== undefined) this.category = data.category;
        if (data.description !== undefined) this.description = data.description;
        if (data.isInCart !== undefined) this.isInCart = data.isInCart;
        if (data.isAvailable !== undefined) this.isAvailable = data.isAvailable;
        return this._container;
    }
}