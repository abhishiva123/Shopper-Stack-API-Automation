import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createShopperData } from '../../src/utils/test-data';

test('Get shopper cards by type', async ({
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

    const shopperCard = {
        cvv: String(card.cvv),
        expiryDate: card.expiryDate,
        id: card.cardId,
        nameOnCard: card.nameOnCard,
        number: card.number,
        type: card.cardType,
        userId: card.shopperId
    };

    const saveResponse =
        await bankService.saveShopperCard(
            shopperCard
        );

    expect(
        [STATUS_CODES.OK, STATUS_CODES.CREATED]
    ).toContain(
        saveResponse.response.status()
    );

    const getResponse =
        await bankService.getShopperCards(
            shopperId,
            'DEBIT'
        );

    expect(
        getResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        getResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        getResponse.body.data
    ).toBeTruthy();
});