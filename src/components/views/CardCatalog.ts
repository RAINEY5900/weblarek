import { Card } from "./Card";
import { CDN_URL } from "../../utils/constants";

export class CardCatalog extends Card<any> {
    private _image: HTMLImageElement;
    private _category: HTMLElement;
    onClick: (id: string) => void = () => {};

    constructor(container: HTMLElement) {
        super(container);
        this._image = container.querySelector('.card__image') as HTMLImageElement;
        this._category = container.querySelector('.card__category') as HTMLElement;
        
        container.addEventListener('click', () => {
            this.onClick(this.getAttribute('data-id'));
        });
    }

    render(data: any): HTMLElement {
        this.setAttribute('data-id', data.id);
        this.title = data.title;
        this.price = data.price;
        if (this._image && data.image) {
            this._image.src = `${CDN_URL}${data.image}`;
        }
        if (this._category && data.category) {
            this._category.textContent = data.category;
        }
        return this._container;
    }
}