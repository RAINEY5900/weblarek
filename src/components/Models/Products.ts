import { IProduct } from '../../types';

export class Products {
    private items: IProduct[] = [];
    private preview: IProduct | null = null;

    setItems(items: IProduct[]): void {
        this.items = items;
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getProductById(id: string): IProduct | undefined {
        return this.items.find(x => x.id === id);
    }

    setPreview(product: IProduct | null): void {
        this.preview = product;
    }

    getPreview(): IProduct | null {
        return this.preview;
    }
}