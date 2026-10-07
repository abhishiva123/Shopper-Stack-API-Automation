import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createMerchantData } from '../../src/utils/test-data';

test('Get merchants by status and zone', async ({
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

    await authService.login(
        merchantData.email,
        merchantData.password,
        'MERCHANT'
    );

    const response = await merchantService.getMerchantsByStatus(
        'ACTIVE',
        'ALPHA'
    );

    expect(response.response.status()).toBe(
        STATUS_CODES.OK
    );

    expect(response.data.data.length).toBeGreaterThan(0);

    expect(response.data.data.every(
        merchant => merchant.status === 'ACTIVE'
    )).toBe(true);

    expect(response.data.data.every(
        merchant => merchant.zoneId === 'ALPHA'
    )).toBe(true);

    console.log(response.data.data[1]);
});