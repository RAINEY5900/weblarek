import { CardCatalog } from './CardCatalog';

interface ICardDetailedData {
    title?: string;
    price?: number | null;
    image?: string;
    category?: string;
    description?: string;
    isInCart?: boolean;
    isAvailable?: boolean;
}

export class CardDetailed extends CardCatalog {
    private _description: HTMLElement;
    private _button: HTMLButtonElement;

    constructor(container: HTMLElement, onToggle: () => void) {
        super(container, () => {});
        this._description = container.querySelector('.card__text') as HTMLElement;
        this._button = container.querySelector('.card__button') as HTMLButtonElement;
        
        if (this._button) {
            this._button.addEventListener('click', (e) => {
                e.stopPropagation();
                onToggle();
            });
        }
    }

    set description(value: string) {
        if (this._description && value) {
            this._description.textContent = value;
        }
    }

    set isInCart(value: boolean) {
        if (this._button) {
            this._button.textContent = value ? 'Убрать из корзины' : 'В корзину';
        }
    }

    set isAvailable(value: boolean) {
        if (this._button) {
            this._button.disabled = !value;
            if (!value) {
                this._button.textContent = 'Недоступно';
            }
        }
    }

    render(data: ICardDetailedData = {}): HTMLElement {
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