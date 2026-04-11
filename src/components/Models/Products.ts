import { IProduct } from '../../types';  // ← ../../types

/**
 * Каталог продуктов.
 */
export class Products {
    private _productsArray: IProduct[] = [];
    private _productSelected: IProduct | null = null;

    // === Методы из ТЗ для совместимости ===
    
    setItems(items: IProduct[]): void {
        this._productsArray = items;
    }

    getItems(): IProduct[] {
        return this._productsArray;
    }

    getProductById(id: string): IProduct | undefined {
        return this._productsArray.find(x => x.id === id);
    }

    setPreview(product: IProduct | null): void {
        this._productSelected = product;
    }

    getPreview(): IProduct | null {
        return this._productSelected;
    }

    // === Ваши оригинальные геттеры/сеттеры (оставьте для обратной совместимости) ===
    
    get productsArray(): IProduct[] {
        return this._productsArray;
    }

    set productsArray(value: IProduct[]) {
        this._productsArray = value;
    }

    get productSelected(): IProduct | null {
        return this._productSelected;
    }

    set productSelected(value: IProduct | null) {
        this._productSelected = value;
    }
}