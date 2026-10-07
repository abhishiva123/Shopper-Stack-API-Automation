import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createShopperData } from '../../src/utils/test-data';

test('Get shopper wallet transactions', async ({
    shopperService,
    authService,
    walletService
}) => {

    // Create shopper
    const shopperData =
        createShopperData();

    const createShopperResponse =
        await shopperService.createShopper(
            shopperData
        );

    expect(
        createShopperResponse.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    const shopperResponseBody =
        await createShopperResponse.json();

    const shopperId =
        shopperResponseBody.data.userId;

    expect(
        shopperId
    ).toBeTruthy();


    // Login shopper
    const loginResponse =
        await authService.login(
            shopperData.email,
            shopperData.password,
            'SHOPPER'
        );

    expect(
        loginResponse.status()
    ).toBe(
        STATUS_CODES.OK
    );


    // Get wallet transactions
    const walletResponse =
        await walletService.getWalletTransactions(
            shopperId
        );


    // Verify wallet endpoint
    expect(
        walletResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );
});