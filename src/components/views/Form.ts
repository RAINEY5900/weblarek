import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IForm, IUserError } from '../../types';

export abstract class Form<T extends IForm> extends Component<T> {
    protected _submitButton: HTMLButtonElement;
    protected _errorsElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (!this._submitButton) {
            this._submitButton = container.querySelector('.order__button') as HTMLButtonElement;
        }
        this._errorsElement = container.querySelector('.form__errors') as HTMLElement;
        
        this._container.addEventListener('submit', (e) => {
            e.preventDefault();
            const formName = this._container.getAttribute('name');
            if (formName === 'order') {
                this.events.emit('order:next');
            } else if (formName === 'contacts') {
                this.events.emit('order:submit');
            }
        });
    }

    set errors(value: IUserError) {
        if (this._errorsElement && value) {
            const errorsList = Object.values(value).filter(Boolean);
            this._errorsElement.textContent = errorsList.join(', ');
        }
    }

    set isValid(value: boolean) {
        if (this._submitButton) {
            this._submitButton.disabled = !value;
        }
    }
}