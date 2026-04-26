import { Form } from './Form';
import { IEvents } from '../base/Events';
import { IUserError } from '../../types';

interface IEmailPhoneData {
    email: string;
    phone: string;
    errors: IUserError;
    isValid: boolean;
}

export class FormEmailPhone extends Form<IEmailPhoneData> {
    private _emailInput: HTMLInputElement;
    private _phoneInput: HTMLInputElement;
    private _errorsContainer: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
        this._phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement;
        this._errorsContainer = container.querySelector('.form__errors') as HTMLElement;

        this._emailInput.addEventListener('input', () => {
            this.events.emit('email:changed', { email: this._emailInput.value });
            this.updateValidationState();
        });

        this._phoneInput.addEventListener('input', () => {
            this.events.emit('phone:changed', { phone: this._phoneInput.value });
            this.updateValidationState();
        });
    }

    get container(): HTMLElement {
        return this._container;
    }

    set email(value: string) {
        if (this._emailInput) {
            this._emailInput.value = value;
        }
        this.updateValidationState();
    }

    set phone(value: string) {
        if (this._phoneInput) {
            this._phoneInput.value = value;
        }
        this.updateValidationState();
    }

    private updateValidationState(): void {
        const emailValid = this._emailInput?.value.trim() !== '';
        const phoneValid = this._phoneInput?.value.trim() !== '';
        
        const isValid = emailValid && phoneValid;
        
        // Обновляем ошибки
        const errors: string[] = [];
        if (!emailValid) {
            errors.push('Введите email');
        }
        if (!phoneValid) {
            errors.push('Введите телефон');
        }
        
        if (this._errorsContainer) {
            this._errorsContainer.textContent = errors.join(', ');
        }
        
        // Обновляем состояние кнопки
        if (this._submitButton) {
            this._submitButton.disabled = !isValid;
        }
    }

    render(data: IEmailPhoneData): HTMLElement {
        this.email = data.email;
        this.phone = data.phone;
        this.errors = data.errors;
        this.isValid = data.isValid;
        this.updateValidationState();
        return this._container;
    }
}