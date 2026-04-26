import { Card } from "./Card";
import { CDN_URL } from "../../utils/constants";

interface ICardCatalogData {
    id: string;
    title: string;
    price: number | null;
    image: string;
    category: string;
}

export class CardCatalog extends Card<ICardCatalogData> {
    private _image: HTMLImageElement;
    private _category: HTMLElement;
    private _id: string = '';
    public onClick: (id: string) => void = () => {};

    constructor(container: HTMLElement) {
        super(container);
        this._image = container.querySelector('.card__image') as HTMLImageElement;
        this._category = container.querySelector('.card__category') as HTMLElement;
        
        container.addEventListener('click', () => {
            this.onClick(this._id);
        });
    }

    set id(value: string) {
        this._id = value;
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
        this.id = data.id;
        this.title = data.title;
        this.price = data.price;
        this.image = data.image;
        this.category = data.category;
        return this._container;
    }
}