https://github.com/RAINEY5900/weblarek.git
## Архитектура проекта (MVP)

Проект реализован с использованием паттерна MVP (Model-View-Presenter):
- **Model** - отвечает за хранение и управление данными
- **View** - отвечает за отображение 
- **Presenter** - связывает Model и View 

## Данные (Interfaces)

### IProduct
Интерфейс товара:
- `id: string` - уникальный идентификатор
- `title: string` - название товара
- `description: string` - описание
- `image: string` - путь к изображению
- `category: string` - категория товара
- `price: number | null` - цена (null означает "без цены")

### IBuyer
Интерфейс покупателя:
- `payment: TPayment` - способ оплаты ('card' или 'cash')
- `email: string` - электронная почта
- `phone: string` - номер телефона
- `address: string` - адрес доставки

### Другие интерфейсы
- `TPayment` - тип способа оплаты
- `IOrder` - структура отправляемого заказа
- `IOrderResponse` - ответ сервера после заказа
- `IProductsResponse` - ответ сервера со списком товаров
- `IErrorsBuyer` - ошибки валидации

## Модели данных

### Класс Products (каталог товаров)
**Назначение:** хранение и управление списком товаров

**Поля:**
- `private _productsArray: IProduct[]` - массив всех товаров
- `private _productSelected: IProduct | null` - выбранный товар

**Методы:**
- `setItems(items: IProduct[]): void` - сохранить массив товаров
- `getItems(): IProduct[]` - получить все товары
- `getProductById(id: string): IProduct | undefined` - получить товар по id
- `setPreview(product: IProduct | null): void` - установить выбранный товар
- `getPreview(): IProduct | null` - получить выбранный товар

### Класс Basket (корзина)
**Назначение:** хранение товаров, выбранных для покупки

**Поля:**
- `private _products: IProduct[]` - массив товаров в корзине

**Методы:**
- `addItem(product: IProduct): void` - добавить товар
- `removeItem(id: string): void` - удалить товар
- `clear(): void` - очистить корзину
- `getTotalPrice(): number` - получить общую стоимость
- `getCount(): number` - получить количество товаров
- `isInBasket(id: string): boolean` - проверить наличие товара
- `getItems(): IProduct[]` - получить все товары

### Класс Buyer (покупатель)
**Назначение:** хранение и валидация данных покупателя

**Поля:**
- `private _data: IBuyer` - данные покупателя

**Методы:**
- `updateInformation(data: Partial<IBuyer>): void` - обновить данные
- `getInformation(): IBuyer` - получить все данные
- `validateInformation(): IErrorsBuyer` - валидация данных
- `isValid(): boolean` - проверка валидности
- `clearInformation(): void` - очистить данные

## Слой коммуникации

### Класс Communicator
**Назначение:** взаимодействие с API сервера

**Конструктор:** `constructor(api: IApi)` - принимает экземпляр класса Api

**Методы:**
- `getProducts(): Promise<IProductsResponse>` - получить список товаров
- `postOrder(order: IOrder): Promise<IOrderResponse>` - отправить заказ

### Класс Api (базовый)
**Назначение:** выполнение HTTP запросов

**Методы:**
- `get<T>(uri: string): Promise<T>` - GET запрос
- `post<T>(uri: string, data: object, method?): Promise<T>` - POST запрос

## Установка и запуск

```bash
npm install
npm run dev