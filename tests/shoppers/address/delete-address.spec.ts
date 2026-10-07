import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createAddressData
} from '../../../src/utils/test-data';

test('Delete shopper address', async ({
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

    // Create address
    const addressData = createAddressData();

    const addressResponse =
        await shopperService.addShopperAddress(
            shopperId,
            addressData
        );

    expect(addressResponse.response.status()).toBe(
        STATUS_CODES.CREATED
    );

    // Get address ID from original API response
    const addressId =
        addressResponse.body.data.addressId;

    // Delete address
    const deleteResponse =
        await shopperService.deleteShopperAddress(
            shopperId,
            addressId
        );

    // Validate HTTP status
    expect(deleteResponse.status()).toBe(
        STATUS_CODES.NO_CONTENT
    );
});