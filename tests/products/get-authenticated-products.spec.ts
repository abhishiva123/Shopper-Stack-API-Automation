import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createShopperData } from '../../src/utils/test-data';

test('Get products as authenticated shopper', async ({
    shopperService,
    authService,
    productService
}) => {
    const shopperData = createShopperData();

    const registerResponse =
        await shopperService.createShopper(shopperData);

    expect(registerResponse.status()).toBe(
        STATUS_CODES.CREATED
    );

    await authService.login(
        shopperData.email,
        shopperData.password,
        'SHOPPER'
    );

    const response =
        await productService.getDefaultProducts();
console.log('First Product ID:', response.data[0].productId);
console.log('First Product Name:', response.data[0].name);
console.log('First Product Price:', response.data[0].price);
    expect(response.statusCode).toBe(
        STATUS_CODES.OK
    );
});