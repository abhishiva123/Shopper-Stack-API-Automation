import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import {
    createShopperData
} from '../../src/utils/test-data';

test('Create bank card for shopper', async ({
    shopperService,
    authService,
    bankService
}) => {

    // Create shopper
    const shopperData =
        createShopperData();

    const createResponse =
        await shopperService.createShopper(
            shopperData
        );

    const createResponseBody =
        await createResponse.json();

    const shopperId =
        createResponseBody.data.userId;


    // Login shopper
    await authService.login(
        shopperData.email,
        shopperData.password,
        'SHOPPER'
    );


    // Create card
    const cardResponse =
        await bankService.createCard(
            'IDHC',
            'DEBIT',
            shopperData.email,
            `${shopperData.firstName} ${shopperData.lastName}`,
            shopperId
        );


    // Validate HTTP status
    expect(
        cardResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );


    // Validate API statusCode
    expect(
        cardResponse.body.statusCode
    ).toBe(
        STATUS_CODES.CREATED
    );


    // Validate card was created
    expect(
        cardResponse.body.data
    ).toBeTruthy();
});