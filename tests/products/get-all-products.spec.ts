import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createMerchantData } from '../../src/utils/test-data';

test('Get all products', async ({
    productService,
    merchantService,
    authService
}) => {

    const merchantData = createMerchantData();

    const createResponse =
        await merchantService.createMerchant(
            merchantData
        );

    expect(createResponse.response.status()).toBe(
        STATUS_CODES.CREATED
    );

    await authService.login(
        merchantData.email,
        merchantData.password,
        'MERCHANT'
    );

    const response =
        await productService.getAllProducts();

    expect(response.response.status()).toBe(
        STATUS_CODES.OK
    );

    expect(response.data.data.length).toBeGreaterThan(0);
});