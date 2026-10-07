import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createItemData
} from '../../../src/utils/test-data';

test('Add product to shopper wishlist', async ({
    shopperService,
    authService
}) => {

    // Create shopper
    const shopperData = createShopperData();

    const createResponse =
        await shopperService.createShopper(shopperData);

    const createResponseBody =
        await createResponse.json();

    const shopperId =
        createResponseBody.data.userId;

    // Login
    await authService.login(
        shopperData.email,
        shopperData.password,
        'SHOPPER'
    );

    // Product to add to wishlist
    const productId = 51;

    const wishlistItem =
        createItemData(productId);

    // Add product to wishlist
    const wishlistResponse =
        await shopperService.addProductToWishlist(
            shopperId,
            wishlistItem
        );

    // Validate HTTP status
    expect(wishlistResponse.response.status()).toBe(
        STATUS_CODES.CREATED
    );

    // Validate actual response
    expect(
        wishlistResponse.body
    ).toBeTruthy();
    expect(wishlistResponse.response.status()).toBe(
    STATUS_CODES.CREATED
);

expect(wishlistResponse.body.data.itemId).toBeTruthy();

expect(wishlistResponse.body.data.productId).toBe(
    productId
);

expect(wishlistResponse.body.data.quantity).toBe(
    wishlistItem.quantity
);

expect(wishlistResponse.body.data.productName).toBe(
    'iphone'
);
});