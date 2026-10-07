import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createMerchantData } from '../../src/utils/test-data';

test('Get merchant by ID', async ({
    merchantService,
    authService
}) => {

    const merchantData = createMerchantData();

    const createResponse = await merchantService.createMerchant(
        merchantData
    );

    expect(createResponse.response.status()).toBe(
        STATUS_CODES.CREATED
    );

    const merchantId = createResponse.data.data.userId;

    await authService.login(
        merchantData.email,
        merchantData.password,
        'MERCHANT'
    );

    const response = await merchantService.getMerchantById(
        merchantId
    );

    expect(response.response.status()).toBe(
        STATUS_CODES.OK
    );

    expect(response.data.data.userId).toBe(
        merchantId
    );

    expect(response.data.data.email).toBe(
        merchantData.email
    );

    expect(response.data.data.firstName).toBe(
        merchantData.firstName
    );
});