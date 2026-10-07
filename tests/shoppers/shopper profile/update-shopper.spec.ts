import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import { createShopperData } from '../../../src/utils/test-data';

test('Update shopper details', async ({
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

    // Updated shopper data
    const updatedShopperData = {
        city: shopperData.city,
        country: shopperData.country,
        email: shopperData.email,
        firstName: 'UpdatedFirstName',
        gender: shopperData.gender,
        lastName: 'UpdatedLastName',
        password: shopperData.password,
        phone: shopperData.phone,
        state: shopperData.state,
        zoneId: shopperData.zoneId
    };

    // Update shopper
    const response =
        await shopperService.updateShopper(
            shopperId,
            updatedShopperData
        );

    // Validate HTTP status
    expect(response.status()).toBe(
        STATUS_CODES.OK
    );

    // Read response body
    const responseBody =
        await response.json();

    // Validate updated values
    expect(responseBody.data.firstName).toBe(
        'UpdatedFirstName'
    );

    expect(responseBody.data.lastName).toBe(
        'UpdatedLastName'
    );
});