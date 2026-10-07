import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import { createShopperData } from '../../../src/utils/test-data';

test('Login, add like and delete like', async ({
    shopperService,
    authService
}) => {

    // 1. Create shopper
    const shopperData =
        createShopperData();

    const createResponse =
        await shopperService.createShopper(
            shopperData
        );

    const shopperResponseBody =
        await createResponse.json();

    const shopperId =
        shopperResponseBody.data.userId;


    // 2. Login shopper
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


    // 3. Add like
    const likes = {
        fashion: [
            'shirt',
            'shoes'
        ]
    };

    const addLikeResponse =
        await shopperService.updateShopperLikes(
            shopperId,
            likes
        );

    expect(
        addLikeResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );


    // 4. Delete like
    const deleteLikeResponse =
        await shopperService.deleteShopperLikes(
            shopperId,
            'fashion'
        );

    // 5. Validate HTTP status
    expect(
        deleteLikeResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    // 6. Validate API statusCode
    expect(
        deleteLikeResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    // 7. Validate message
    expect(
        deleteLikeResponse.body.message
    ).toBe(
        'Success'
    );

    // 8. Validate deleted data
    expect(
        deleteLikeResponse.body.data
    ).toEqual({});
});