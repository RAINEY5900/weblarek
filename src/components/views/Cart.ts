import { Component } from "../base/Component";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart extends Component<void> {
    private products: IProduct[] = [];

    constructor(private events: IEvents) {
        super(document.createElement('div'));
    }

    addProduct(product: IProduct): void {
        if (!this.contains(product.id)) {
            this.products.push(product);
            this.events.emit('cart:changed');
        }
    }

    removeProduct(product: IProduct): void {
        this.products = this.products.filter(p => p.id !== product.id);
        this.events.emit('cart:changed');
    }

    contains(id: string): boolean {
        return this.products.some(p => p.id === id);
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getCount(): number {
        return this.products.length;
    }

    getTotalPrice(): number {
        return this.products.reduce((sum, p) => sum + (p.price || 0), 0);
    }

    clear(): void {
        this.products = [];
        this.events.emit('cart:changed');
    }
}