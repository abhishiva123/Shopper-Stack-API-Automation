import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createItemData
} from '../../../src/utils/test-data';

test('Delete product from shopper wishlist', async ({
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

    // Product to add
    const productId = 51;

    const wishlistItem =
        createItemData(productId);

    // Add product to wishlist
    const wishlistResponse =
        await shopperService.addProductToWishlist(
            shopperId,
            wishlistItem
        );

    expect(wishlistResponse.response.status()).toBe(
        STATUS_CODES.CREATED
    );

    // Delete product from wishlist
    const deleteResponse =
        await shopperService.deleteProductFromWishlist(
            shopperId,
            productId
        );

    // Validate HTTP status
    expect(deleteResponse.status()).toBe(
        STATUS_CODES.NO_CONTENT
    );
});