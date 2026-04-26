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

    setAttribute(name: string, value: string): void {
        this._container.setAttribute(name, value);
    }

    getAttribute(name: string): string {
        return this._container.getAttribute(name) || '';
    }
}