import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class Cart {
    private products: IProduct[] = [];

    constructor(private events: IEvents) {
        const saved = localStorage.getItem('weblarek_cart');
        if (saved) {
            this.products = JSON.parse(saved);
            setTimeout(() => this.events.emit('cart:changed'), 0);
        }
    }

    addProduct(product: IProduct): void {
        if (!this.contains(product.id)) {
            this.products.push(product);
            localStorage.setItem('weblarek_cart', JSON.stringify(this.products));
            this.events.emit('cart:changed');
        }
    }

    removeProduct(product: IProduct): void {
        this.products = this.products.filter(p => p.id !== product.id);
        localStorage.setItem('weblarek_cart', JSON.stringify(this.products));
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
        localStorage.setItem('weblarek_cart', JSON.stringify(this.products));
        this.events.emit('cart:changed');
    }
}