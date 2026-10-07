import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import { createShopperData } from '../../../src/utils/test-data';

test('Get shopper likes', async ({
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

    expect(
        createResponse.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    const shopperResponseBody =
        await createResponse.json();

    const shopperId =
        shopperResponseBody.data.userId;

    expect(
        shopperId
    ).toBeTruthy();

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

    // 3. Create shopper likes
    const likes = {
        electronics: [
            'iphone',
            'laptop'
        ],
        fashion: [
            'shirt',
            'shoes'
        ]
    };

    // 4. Update likes
    const updateLikesResponse =
        await shopperService.updateShopperLikes(
            shopperId,
            likes
        );

    expect(
        updateLikesResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    // 5. Get shopper likes
    const likesResponse =
        await shopperService.getShopperLikes(
            shopperId
        );

    // 6. Validate HTTP status
    expect(
        likesResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    // 7. Validate API statusCode
    expect(
        likesResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    // 8. Validate message
    expect(
        likesResponse.body.message
    ).toBe(
        'Success'
    );

    // 9. Verify returned likes
    expect(
        likesResponse.body.data.electronics
    ).toEqual(
        likes.electronics
    );

    expect(
        likesResponse.body.data.fashion
    ).toEqual(
        likes.fashion
    );
});