import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createShopperData } from '../../src/utils/test-data';

test('Register a new shopper', async ({ shopperService }) => {

    const shopperData = createShopperData();

    const response = await shopperService.createShopper(
        shopperData
    );

    expect(response.status()).toBe(
        STATUS_CODES.CREATED
    );

    const responseBody = await response.json();

    expect(responseBody.data.email).toBe(
        shopperData.email
    );
});