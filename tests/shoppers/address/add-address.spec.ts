import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createAddressData
} from '../../../src/utils/test-data';

test('Add address for shopper', async ({
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

    // Create address data
    const addressData = createAddressData();

    // Add address
    const addressResponse =
        await shopperService.addShopperAddress(
            shopperId,
            addressData
        );

    expect(addressResponse.response.status()).toBe(
        STATUS_CODES.CREATED
    );

    const addressId =
        addressResponse.body.data.addressId;

    expect(addressId).toBeTruthy();

    expect(addressResponse.body.data.city).toBe(
        addressData.city
    );

    expect(addressResponse.body.data.pincode).toBe(
        addressData.pincode
    );
});