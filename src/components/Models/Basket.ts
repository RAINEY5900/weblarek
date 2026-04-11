import { IProduct } from '../../types';  // ← ../../types

/**
 * Корзина.
 */
export class Basket {
    private _products: IProduct[] = [];

    // === Методы из ТЗ ===
    
    addItem(product: IProduct): void {
        this.addProduct(product);
    }

    removeItem(id: string): void {
        this.deleteProduct(id);
    }

    clear(): void {
        this.clearProducts();
    }

    getTotalPrice(): number {
        return this.getTotalAmount();
    }

    getCount(): number {
        return this.getTotalCount();
    }

    isInBasket(id: string): boolean {
        return this.isProductInProducts(id);
    }

    getItems(): IProduct[] {
        return this.products;
    }

    // === Ваши оригинальные методы ===
    
    addProduct(product: IProduct): void {
        if (!this.isProductInProducts(product.id)) {
            this._products.push(product);
        }
    }

    deleteProduct(id: string): void {
        this._products = this._products.filter(x => x.id !== id);
    }

    clearProducts(): void {
        this._products = [];
    }

    getTotalAmount(): number {
        return this._products.reduce((acc, item) => {
            return acc + (item.price ?? 0);
        }, 0);
    }

    getTotalCount(): number {
        return this._products.length;
    }

    isProductInProducts(id: string): boolean {
        return this._products.some(x => x.id === id);
    }

    get products(): IProduct[] {
        return this._products;
    }
}