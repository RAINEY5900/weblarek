import { Api } from './components/base/Api';
import { Communicator } from './components/Communicator';
import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

console.log('=== ТЕСТИРОВАНИЕ МОДЕЛЕЙ ДАННЫХ ===\n');

// Создаем экземпляры
const productsModel = new Products();
const basketModel = new Basket();
const buyerModel = new Buyer();

// 1. Тестируем Products
console.log('1. Тест Products (каталог):');
productsModel.setItems(apiProducts.items);
console.log('   Товаров в каталоге:', productsModel.getItems().length);
console.log('   Первый товар:', productsModel.getItems()[0]?.title);

// 2. Тестируем Basket
console.log('\n2. Тест Basket (корзина):');
basketModel.addItem(apiProducts.items[0]);
basketModel.addItem(apiProducts.items[1]);
console.log('   Товаров в корзине:', basketModel.getCount());
console.log('   Общая сумма:', basketModel.getTotalPrice());

// 3. Тестируем Buyer
console.log('\n3. Тест Buyer (покупатель):');
buyerModel.updateInformation({
    email: 'test@example.com',
    phone: '+79991234567',
    address: 'ул. Тестовая, 1'
});
console.log('   Данные валидны?', buyerModel.isValid());

// 4. Запрос к серверу
console.log('\n4. Запрос к серверу:');
const api = new Api(API_URL);
const communicator = new Communicator(api);

communicator.getProducts()
    .then((response: { items: any[] }) => {
        console.log('   ✅ Успешно! Получено товаров:', response.items.length);
        productsModel.setItems(response.items);
        console.log('   Каталог обновлен данными с сервера');
    })
    .catch((error: any) => {
        console.error('   ❌ Ошибка:', error);
    });