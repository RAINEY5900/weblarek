import { Component } from "../base/Component";

export class Gallery extends Component<any> {
    constructor(container: HTMLElement) {
        super(container);
    }

    render(data: any): HTMLElement {
        if (data.catalog) {
            this._container.replaceChildren(...data.catalog);
        }
        return this._container;
    }
}