import { IEvents } from '../base/Events';
import { TPayment, IUserError } from '../../types';
import { Catalog } from '../models/Catalog';
import { Cart } from '../models/Cart';
import { User } from '../models/User';
import { UserApi } from '../models/UserApi';
import { Gallery } from '../views/Gallery';
import { Modal } from '../views/Modal';
import { Header } from '../views/Header';
import { FormPaymentAddress } from '../views/FormPaymentAddress';
import { FormEmailPhone } from '../views/FormEmailPhone';
import { CartView } from '../views/CartView';
import { CardCatalog } from '../views/CardCatalog';
import { CardCart } from '../views/CardCart';
import { CardDetailed } from '../views/CardDetailed';
import { Success } from '../views/Success';

export class Presenter {
    private cardDetailed: CardDetailed;

    constructor(
        private events: IEvents,
        private catalog: Catalog,
        private cart: Cart,
        private user: User,
        private userApi: UserApi,
        private gallery: Gallery,
        private modal: Modal,
        private header: Header,
        private cartView: CartView,
        private formPaymentAddress: FormPaymentAddress,
        private formEmailPhone: FormEmailPhone,
        private success: Success,
        private cardCatalogTemplate: HTMLElement,
        private cardCartTemplate: HTMLElement,
        private cardPreviewTemplate: HTMLElement
    ) {
        this.cardDetailed = new CardDetailed(
            this.cardPreviewTemplate.cloneNode(true) as HTMLElement,
            () => {
                this.events.emit('preview:toggle');
            }
        );
        this.bindEvents();
        this.loadCatalog();
    }

    private async loadCatalog(): Promise<void> {
        try {
            const data = await this.userApi.get();
            this.catalog.setProducts(data.items);
        } catch (error) {
            console.error('Ошибка загрузки каталога:', error);
        }
    }

    private bindEvents(): void {
        this.events.on('catalog:changed', () => {
            this.renderCatalog();
        });

        this.events.on('catalog:previewChanged', () => {
            this.openPreview();
        });

        this.events.on('cart:changed', () => {
            this.renderCart();
            this.renderHeader();
            this.updatePreviewButton();
        });

        this.events.on('user:changed', () => {
            this.renderForms();
        });

        this.events.on('card:select', (data: { id: string }) => {
            const product = this.catalog.getProductById(data.id);
            if (product) {
                this.catalog.setDetailedProduct(product);
            }
        });

        this.events.on('preview:toggle', () => {
            const product = this.catalog.getDetailedProduct();
            if (!product) return;
            
            if (this.cart.contains(product.id)) {
                this.cart.removeProduct(product);
            } else {
                this.cart.addProduct(product);
            }
            this.modal.close();
        });

        this.events.on('cart:opened', () => {
            this.modal.open(this.cartView.container);
        });

        this.events.on('order:open', () => {
            this.modal.open(this.formPaymentAddress.container);
        });

        this.events.on('order:next', () => {
            this.modal.open(this.formEmailPhone.container);
        });

        this.events.on('order:submit', async () => {
            try {
                const userData = this.user.get();
                const order = {
                    payment: userData.payment as TPayment,
                    address: userData.address || '',
                    email: userData.email || '',
                    phone: userData.phone || '',
                    items: this.cart.getProducts().map(p => p.id),
                    total: this.cart.getTotalPrice(),
                };
                const response = await this.userApi.post(order);
                this.cart.clear();
                this.user.clear();
                this.success.render({ total: response.total });
                this.modal.open(this.success.container);
            } catch (error) {
                console.error('Ошибка отправки заказа:', error);
            }
        });

        this.events.on('success:close', () => {
            this.modal.close();
            this.renderHeader();
        });

        this.events.on('payment:changed', (data: { payment: string }) => {
            this.user.set({ payment: data.payment as TPayment });
        });

        this.events.on('address:changed', (data: { address: string }) => {
            this.user.set({ address: data.address });
        });

        this.events.on('email:changed', (data: { email: string }) => {
            this.user.set({ email: data.email });
        });

        this.events.on('phone:changed', (data: { phone: string }) => {
            this.user.set({ phone: data.phone });
        });

        this.events.on('card:removed', (data: { id: string }) => {
            const product = this.catalog.getProductById(data.id);
            if (product) {
                this.cart.removeProduct(product);
            }
        });
    }

    private renderCatalog(): void {
        const products = this.catalog.getProducts();
        const elements = products.map(product => {
            const card = new CardCatalog(
                this.cardCatalogTemplate.cloneNode(true) as HTMLElement,
                () => {
                    this.events.emit('card:select', { id: product.id });
                }
            );
            card.render({
                title: product.title,
                price: product.price,
                image: product.image,
                category: product.category
            });
            return card.container;
        });
        this.gallery.render({ catalog: elements });
    }

    private renderCart(): void {
        const products = this.cart.getProducts();
        const items = products.map((product, index) => {
            const card = new CardCart(
                this.cardCartTemplate.cloneNode(true) as HTMLElement,
                () => {
                    this.events.emit('card:removed', { id: product.id });
                }
            );
            card.render({
                title: product.title,
                price: product.price,
                index: index + 1
            });
            return card.container;
        });
        
        this.cartView.render({
            items: items,
            total: this.cart.getTotalPrice(),
            disabled: this.cart.getCount() === 0
        });
    }

    private renderHeader(): void {
        this.header.render({ count: this.cart.getCount() });
    }

    private openPreview(): void {
        const product = this.catalog.getDetailedProduct();
        if (!product) return;

        this.cardDetailed.render({
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            description: product.description,
            isInCart: this.cart.contains(product.id),
            isAvailable: product.price !== null
        });
        this.modal.open(this.cardDetailed.container);
    }

    private updatePreviewButton(): void {
        const product = this.catalog.getDetailedProduct();
        if (product) {
            this.cardDetailed.isInCart = this.cart.contains(product.id);
        }
    }

    private renderForms(): void {
        const userData = this.user.get();
        const errors = this.user.validate();

        const paymentAddressErrors: IUserError = {};
        if (errors.payment) paymentAddressErrors.payment = errors.payment;
        if (errors.address) paymentAddressErrors.address = errors.address;

        const emailPhoneErrors: IUserError = {};
        if (errors.email) emailPhoneErrors.email = errors.email;
        if (errors.phone) emailPhoneErrors.phone = errors.phone;

        this.formPaymentAddress.render({
            payment: userData.payment || null,
            address: userData.address || '',
            errors: paymentAddressErrors,
            isValid: !!(userData.payment && userData.address)
        });

        this.formEmailPhone.render({
            email: userData.email || '',
            phone: userData.phone || '',
            errors: emailPhoneErrors,
            isValid: !!(userData.email && userData.phone)
        });
    }
}