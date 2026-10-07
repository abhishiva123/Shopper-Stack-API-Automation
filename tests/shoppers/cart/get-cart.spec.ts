import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import { createShopperData } from '../../../src/utils/test-data';

test('Get shopper cart', async ({
    shopperService,
    authService
}) => {

    // Create shopper
    const shopperData = createShopperData();

    const createResponse =
        await shopperService.createShopper(shopperData);

    const createResponseBody =
        await createResponse.json();

    const shopperId =
        createResponseBody.data.userId;

    // Login
    await authService.login(
        shopperData.email,
        shopperData.password,
        'SHOPPER'
    );

    // Get cart
    const cartResponse =
        await shopperService.getShopperCart(
            shopperId
        );

    // Validate HTTP status
    expect(cartResponse.response.status()).toBe(
        STATUS_CODES.OK
    );
});