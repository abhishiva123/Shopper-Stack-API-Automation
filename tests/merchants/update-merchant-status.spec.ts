import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createMerchantData } from '../../src/utils/test-data';

test('Update merchant status', async ({
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

    const response =
        await merchantService.updateMerchantStatus(
            merchantId,
            'BLOCKED'
        );

    expect(response.status()).toBe(
        STATUS_CODES.OK
    );

    const responseBody = await response.json();

    expect(responseBody.data.status).toBe(
        'BLOCKED'
    );
});