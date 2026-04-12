import { Api } from './components/base/Api';
import { Communicator } from './components/Communicator';
import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';
import { IProduct } from './types';

console.log('=== ТЕСТИРОВАНИЕ МОДЕЛЕЙ ДАННЫХ ===\n');

const productsModel = new Products();
const basketModel = new Basket();
const buyerModel = new Buyer();

// 1. Тест Products (все методы)
console.log('1. Тест Products:');
productsModel.setItems(apiProducts.items);
console.log('   getItems():', productsModel.getItems().length, 'товаров');
console.log('   getProductById():', productsModel.getProductById(apiProducts.items[0]?.id)?.title);
productsModel.setPreview(apiProducts.items[0]);
console.log('   getPreview():', productsModel.getPreview()?.title);
productsModel.setPreview(null);
console.log('   getPreview() после сброса:', productsModel.getPreview());

// 2. Тест Basket (все методы)
console.log('\n2. Тест Basket:');
console.log('   getCount() до добавления:', basketModel.getCount());
basketModel.addItem(apiProducts.items[0]);
basketModel.addItem(apiProducts.items[1]);
console.log('   getCount() после добавления:', basketModel.getCount());
console.log('   getTotalPrice():', basketModel.getTotalPrice());
console.log('   isInBasket():', basketModel.isInBasket(apiProducts.items[0].id));
basketModel.removeItem(apiProducts.items[0].id);
console.log('   getCount() после удаления:', basketModel.getCount());
basketModel.clear();
console.log('   getCount() после clear():', basketModel.getCount());

// 3. Тест Buyer (все методы)
console.log('\n3. Тест Buyer:');
console.log('   isValid() до заполнения:', buyerModel.isValid());
buyerModel.updateInformation({ email: 'test@example.com' });
console.log('   после updateInformation(email):', buyerModel.getInformation());
buyerModel.updateInformation({ phone: '+79991234567', address: 'ул. Тестовая, 1' });
console.log('   после updateInformation(phone, address):', buyerModel.getInformation());
console.log('   isValid() после заполнения:', buyerModel.isValid());
console.log('   validateInformation():', buyerModel.validateInformation());
buyerModel.clearInformation();
console.log('   после clearInformation():', buyerModel.getInformation());

// 4. Запрос к серверу
console.log('\n4. Запрос к серверу:');
const api = new Api(API_URL);
const communicator = new Communicator(api);

communicator.getProducts()
    .then((response: { items: IProduct[] }) => {
        console.log('   ✅ Успешно! Получено товаров:', response.items.length);
        productsModel.setItems(response.items);
        console.log('   Каталог обновлен данными с сервера');
    })
    .catch((error: Error) => {
        console.error('   ❌ Ошибка:', error.message);
    });