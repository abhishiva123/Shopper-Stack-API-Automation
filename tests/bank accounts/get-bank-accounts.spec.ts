import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createShopperData } from '../../src/utils/test-data';

test('Get shopper bank accounts', async ({
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

    const createBankAccountResponse =
        await bankAccountService.createBankAccount(
            'IDHC',
            shopperData.email,
            shopperId
        );

    expect(
        createBankAccountResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    const bankAccountsResponse =
        await bankAccountService.getBankAccounts(
            shopperId
        );

    expect(
        bankAccountsResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        bankAccountsResponse.body.data.length
    ).toBeGreaterThan(0);
});