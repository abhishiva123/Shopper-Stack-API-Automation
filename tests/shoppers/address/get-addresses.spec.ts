import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createAddressData
} from '../../../src/utils/test-data';

test('Get all addresses for shopper', async ({
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

    await shopperService.addShopperAddress(
        shopperId,
        addressData
    );

    // Get all addresses
    const addressesResponse =
        await shopperService.getShopperAddresses(
            shopperId
        );

    // Validate HTTP status
    expect(addressesResponse.response.status()).toBe(
        STATUS_CODES.OK
    );

    // Validate actual API response
    expect(
        addressesResponse.body.data.length
    ).toBeGreaterThan(0);

    expect(
        addressesResponse.body.data.some(
            (address: any) =>
                address.city === addressData.city &&
                address.pincode === addressData.pincode
        )
    ).toBe(true);
});