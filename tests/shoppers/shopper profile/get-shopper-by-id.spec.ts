import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createShopperData } from '../../src/utils/test-data';

test('Get shopper by ID', async ({
    shopperService,
    authService
}) => {

    // Create shopper
    const shopperData = createShopperData();

    const createResponse =
        await shopperService.createShopper(shopperData);

    // Read create response
    const createResponseBody =
        await createResponse.json();

    // Get shopper ID
    const shopperId =
        createResponseBody.data.userId;

    // Login with created shopper
    await authService.login(
        shopperData.email,
        shopperData.password,
        'SHOPPER'
    );

    // Get shopper by ID
    const response =
        await shopperService.getShopperById(shopperId);

    // Validate HTTP status
    expect(response.status()).toBe(
        STATUS_CODES.OK
    );

    // Read response body
    const responseBody =
        await response.json();

    // Validate shopper ID
    expect(responseBody.data.userId).toBe(
        shopperId
    );

    // Validate shopper email
    expect(responseBody.data.email).toBe(
        shopperData.email
    );
});