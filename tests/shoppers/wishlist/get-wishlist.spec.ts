import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createItemData
} from '../../../src/utils/test-data';
import type { WishlistItem } from '../../../src/schemas/wishlist-schema';

test('Get shopper wishlist', async ({
    shopperService,
    authService
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


   // Add products to wishlist
const productIds = [51, 100, 101];

for (const productId of productIds) {

    const wishlistItem =
        createItemData(
            productId,
            1
        );

    const wishlistResponse =
        await shopperService.addProductToWishlist(
            shopperId,
            wishlistItem
        );

    expect(
        wishlistResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );
}


// Get wishlist
const getWishlistResponse =
    await shopperService.getShopperWishlist(
        shopperId
    );


// Validate HTTP status
expect(
    getWishlistResponse.response.status()
).toBe(
    STATUS_CODES.OK
);


// Verify all products exist in wishlist
const wishlist =
    getWishlistResponse.body.data;

for (const productId of productIds) {

    const product =
        wishlist.find(
            (item: WishlistItem) =>
                item.productId === productId
        );

    expect(product).toBeTruthy();

    expect(product?.productId).toBe(
        productId
    );
}
});