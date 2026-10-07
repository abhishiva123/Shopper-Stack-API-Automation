import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createItemData
} from '../../../src/utils/test-data';

test('Update product quantity in shopper cart', async ({
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

    // Add product to cart
    const productId = 51;

    const cartItem =
        createItemData(productId, 1);

    const addCartResponse =
        await shopperService.addProductToCart(
            shopperId,
            cartItem
        );

    expect(addCartResponse.response.status()).toBe(
        STATUS_CODES.CREATED
    );

    // Get itemId from original POST response
    const itemId =
        addCartResponse.body.data.itemId;

    // Updated quantity
    const updatedCartItem =
        createItemData(productId, 3);

    // Update cart item
    const updateResponse =
        await shopperService.updateCartItem(
            shopperId,
            itemId,
            updatedCartItem
        );

    // Validate HTTP status
    expect(updateResponse.response.status()).toBe(
        STATUS_CODES.OK
    );

    // Validate actual API response
    expect(
        updateResponse.body.data.itemId
    ).toBe(itemId);

    expect(
        updateResponse.body.data.productId
    ).toBe(productId);

    expect(
        updateResponse.body.data.quantity
    ).toBe(updatedCartItem.quantity);
});