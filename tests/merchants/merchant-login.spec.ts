import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createMerchantData } from '../../src/utils/test-data';

test('Merchant login', async ({
    merchantService,
    authService
}) => {

    const merchantData = createMerchantData();

    await merchantService.createMerchant(merchantData);

    const response = await authService.login(
        merchantData.email,
        merchantData.password,
        'MERCHANT'
    );

    expect(response.status()).toBe(
        STATUS_CODES.OK
    );

    const responseBody = await response.json();

    expect(responseBody.data.email).toBe(
        merchantData.email
    );

    expect(responseBody.data.role).toBe(
        'MERCHANT'
    );

    expect(responseBody.data.jwtToken).toBeTruthy();
});