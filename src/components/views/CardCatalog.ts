import { Card } from './Card';
import { CDN_URL } from '../../utils/constants';

interface ICardCatalogData {
    title: string;
    price: number | null;
    image: string;
    category: string;
}

export class CardCatalog extends Card<ICardCatalogData> {
    private _image: HTMLImageElement;
    private _category: HTMLElement;

    constructor(container: HTMLElement, private onClickHandler: () => void) {
        super(container);
        this._image = container.querySelector('.card__image') as HTMLImageElement;
        this._category = container.querySelector('.card__category') as HTMLElement;
        
        container.addEventListener('click', () => {
            this.onClickHandler();
        });
    }

    get container(): HTMLElement {
        return this._container;
    }

    set image(value: string) {
        if (this._image && value) {
            this._image.src = `${CDN_URL}${value}`;
        }
    }

    set category(value: string) {
        if (this._category && value) {
            this._category.textContent = value;
        }
    }

    render(data: ICardCatalogData): HTMLElement {
        this.title = data.title;
        this.price = data.price;
        this.image = data.image;
        this.category = data.category;
        return this._container;
    }
}