import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createShopperData } from '../../src/utils/test-data';

test('Verify bank card', async ({
    shopperService,
    authService,
    bankService
}) => {

    const shopperData = createShopperData();

    const createResponse =
        await shopperService.createShopper(
            shopperData
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

    const cardResponse =
        await bankService.createCard(
            'IDHC',
            'DEBIT',
            shopperData.email,
            `${shopperData.firstName} ${shopperData.lastName}`,
            shopperId
        );

    expect(
        cardResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    const card =
        cardResponse.body.data;

    const verifyResponse =
        await bankService.verifyCard(card);

    expect(
        verifyResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        verifyResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        verifyResponse.body.data
    ).toBeTruthy();
});