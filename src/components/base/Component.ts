export abstract class Component<T> {
    protected _container: HTMLElement;

    constructor(container: HTMLElement) {
        this._container = container;
    }

    render(data?: Partial<T>): HTMLElement {
        if (data) {
            Object.assign(this, data);
        }
        return this._container;
    }
}