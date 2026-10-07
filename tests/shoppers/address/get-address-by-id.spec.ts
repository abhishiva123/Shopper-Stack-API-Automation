import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createAddressData
} from '../../../src/utils/test-data';

test('Get shopper address by ID', async ({
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

    // Get address ID from actual API response
    const addressId =
        addressResponse.body.data.addressId;

    // Get address by ID
    const getAddressResponse =
        await shopperService.getShopperAddressById(
            shopperId,
            addressId
        );

    // Validate HTTP status
    expect(getAddressResponse.response.status()).toBe(
        STATUS_CODES.OK
    );

    // Validate actual API response
    expect(
        getAddressResponse.body.data.addressId
    ).toBe(addressId);

    expect(
        getAddressResponse.body.data.city
    ).toBe(addressData.city);

    expect(
        getAddressResponse.body.data.pincode
    ).toBe(addressData.pincode);
});