import { Component } from '../base/Component';

interface IGalleryData {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGalleryData> {
    constructor(container: HTMLElement) {
        super(container);
    }

    set catalog(elements: HTMLElement[]) {
        this._container.replaceChildren(...elements);
    }
}