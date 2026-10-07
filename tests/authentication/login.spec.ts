import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createShopperData } from '../../src/utils/test-data';

test('Login registered shopper', async ({
    shopperService,
    authService
}) => {
    const shopperData = createShopperData();

    const registerResponse =
        await shopperService.createShopper(shopperData);

    expect(registerResponse.status()).toBe(
        STATUS_CODES.CREATED
    );

    const loginResponse = await authService.login(
        shopperData.email,
        shopperData.password,
        'SHOPPER'
    );

    expect(loginResponse.status()).toBe(
        STATUS_CODES.OK
    );
});