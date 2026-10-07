import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createMerchantData } from '../../src/utils/test-data';

test('Create merchant', async ({
    merchantService
}) => {

    const merchantData = createMerchantData();

    const response =
        await merchantService.createMerchant(merchantData);

    expect(response.response.status()).toBe(
        STATUS_CODES.CREATED
    );

    console.log('Merchant:', response.data.data);

    expect(response.data.data.email).toBe(
        merchantData.email
    );

    expect(response.data.data.firstName).toBe(
        merchantData.firstName
    );
});