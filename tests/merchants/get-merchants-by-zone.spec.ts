import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createMerchantData } from '../../src/utils/test-data';

test('Get merchants by zone', async ({
    merchantService,
    authService
}) => {

    const merchantData = createMerchantData();

    await merchantService.createMerchant(merchantData);

    await authService.login(
        merchantData.email,
        merchantData.password,
        'MERCHANT'
    );

    const response =
        await merchantService.getMerchantsByZone('ALPHA');

    expect(response.response.status()).toBe(
        STATUS_CODES.OK
    );

    expect(response.data.data.length).toBeGreaterThan(0);

    // for (const merchant of response.data.data) {
    //   expect(merchant.zoneId).toBe('ALPHA');
    // }

    expect(response.data.data.length).toBeGreaterThan(0);

    // for (const merchant of response.data.data) {
    //     expect(merchant.zoneId).toBe('ALPHA');
    // }
    console.log(
        'Merchant count:',
        response.data.data.length
    );
});