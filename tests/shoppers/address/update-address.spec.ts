import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createAddressData
} from '../../../src/utils/test-data';

test('Update shopper address', async ({
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

    // Create updated address data
    const updatedAddressData = createAddressData();

    // Update address
    const updateResponse =
        await shopperService.updateShopperAddress(
            shopperId,
            addressId,
            updatedAddressData
        );

    // Validate HTTP status
    expect(updateResponse.response.status()).toBe(
        STATUS_CODES.OK
    );

    // Validate actual API response
    expect(
        updateResponse.body.data.addressId
    ).toBe(addressId);

    expect(
        updateResponse.body.data.city
    ).toBe(updatedAddressData.city);

    expect(
        updateResponse.body.data.pincode
    ).toBe(updatedAddressData.pincode);
});