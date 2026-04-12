import { IProduct } from '../../types';

export class Basket {
    private products: IProduct[] = [];

    addItem(product: IProduct): void {
        if (!this.isInBasket(product.id)) {
            this.products.push(product);
        }
    }

    removeItem(id: string): void {
        this.products = this.products.filter(item => item.id !== id);
    }

    clear(): void {
        this.products = [];
    }

    getTotalPrice(): number {
        return this.products.reduce((sum, item) => sum + (item.price ?? 0), 0);
    }

    getCount(): number {
        return this.products.length;
    }

    isInBasket(id: string): boolean {
        return this.products.some(item => item.id === id);
    }

    getItems(): IProduct[] {
        return this.products;
    }
}