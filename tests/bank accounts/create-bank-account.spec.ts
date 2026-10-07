import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createShopperData } from '../../src/utils/test-data';

test('Create bank account', async ({
    shopperService,
    authService,
    bankAccountService
}) => {

    const shopperData =
        createShopperData();

    const createResponse =
        await shopperService.createShopper(
            shopperData
        );

    expect(
        createResponse.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    const createResponseBody =
        await createResponse.json();

    const shopperId =
        createResponseBody.data.userId;

    await authService.login(
        shopperData.email,
        shopperData.password,
        'SHOPPER'
    );

    const bankAccountResponse =
        await bankAccountService.createBankAccount(
            'IDHC',
            shopperData.email,
            shopperId
        );

    expect(
        bankAccountResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );
});