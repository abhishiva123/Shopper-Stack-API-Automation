import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import { createShopperData } from '../../../src/utils/test-data';

test('Add and update shopper likes', async ({
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

    // 3. Add initial likes
    const initialLikes = {
        electronics: [
            'iphone',
            'laptop'
        ],
        fashion: [
            'shirt'
        ]
    };

    const addLikesResponse =
        await shopperService.updateShopperLikes(
            shopperId,
            initialLikes
        );

    expect(
        addLikesResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        addLikesResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    // 4. Get likes
    const initialGetResponse =
        await shopperService.getShopperLikes(
            shopperId
        );

    expect(
        initialGetResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        initialGetResponse.body.data
    ).toEqual(
        initialLikes
    );

    // 5. Update likes
    const updatedLikes = {
        electronics: [
            'iphone',
            'laptop',
            'tablet'
        ],
        fashion: [
            'shirt',
            'shoes'
        ]
    };

    const updateLikesResponse =
        await shopperService.updateShopperLikes(
            shopperId,
            updatedLikes
        );

    expect(
        updateLikesResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        updateLikesResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    // 6. Get updated likes
    const updatedGetResponse =
        await shopperService.getShopperLikes(
            shopperId
        );

    expect(
        updatedGetResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    // 7. Verify updated likes
    expect(
        updatedGetResponse.body.data
    ).toEqual(
        updatedLikes
    );
});