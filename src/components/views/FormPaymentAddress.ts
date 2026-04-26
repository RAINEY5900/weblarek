import { Form } from './Form';
import { IEvents } from '../base/Events';
import { IUserError } from '../../types';

interface IPaymentAddressData {
    payment: string | null;
    address: string;
    errors: IUserError;
    isValid: boolean;
}

export class FormPaymentAddress extends Form<IPaymentAddressData> {
    private _paymentButtons: NodeListOf<HTMLButtonElement>;
    private _addressInput: HTMLInputElement;
    private _errorsContainer: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._paymentButtons = container.querySelectorAll('.order__buttons .button_alt');
        this._addressInput = container.querySelector('input[name="address"]') as HTMLInputElement;
        this._errorsContainer = container.querySelector('.form__errors') as HTMLElement;

        this._paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                const paymentValue = button.getAttribute('value') || (button.name === 'card' ? 'card' : 'cash');
                this.events.emit('payment:changed', { payment: paymentValue });
                this.updateValidationState();
            });
        });

        this._addressInput.addEventListener('input', () => {
            this.events.emit('address:changed', { address: this._addressInput.value });
            this.updateValidationState();
        });
    }

    get container(): HTMLElement {
        return this._container;
    }

    set payment(value: string | null) {
        this._paymentButtons.forEach(button => {
            const buttonValue = button.getAttribute('value') || (button.name === 'card' ? 'card' : 'cash');
            if (buttonValue === value) {
                button.classList.add('button_alt-active');
            } else {
                button.classList.remove('button_alt-active');
            }
        });
        this.updateValidationState();
    }

    set address(value: string) {
        if (this._addressInput) {
            this._addressInput.value = value;
        }
        this.updateValidationState();
    }

    private updateValidationState(): void {
        const addressValid = this._addressInput?.value.trim() !== '';
        
        let paymentValid = false;
        this._paymentButtons.forEach(button => {
            if (button.classList.contains('button_alt-active')) {
                paymentValid = true;
            }
        });
        
        const isValid = addressValid && paymentValid;
        
        // Обновляем ошибки
        const errors: string[] = [];
        if (!paymentValid) {
            errors.push('Выберите способ оплаты');
        }
        if (!addressValid) {
            errors.push('Введите адрес доставки');
        }
        
        if (this._errorsContainer) {
            this._errorsContainer.textContent = errors.join(', ');
        }
        
        // Обновляем состояние кнопки
        if (this._submitButton) {
            this._submitButton.disabled = !isValid;
        }
    }

    render(data: IPaymentAddressData): HTMLElement {
        this.payment = data.payment;
        this.address = data.address;
        this.errors = data.errors;
        this.isValid = data.isValid;
        this.updateValidationState();
        return this._container;
    }
}