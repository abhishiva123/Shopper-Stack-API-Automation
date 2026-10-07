import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createItemData
} from '../../../src/utils/test-data';

test('Get shopper cart after adding a product', async ({
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

    // Create cart item
    const cartItem =
        createItemData(productId, 1);

    // Add product to cart
    const addCartResponse =
        await shopperService.addProductToCart(
            shopperId,
            cartItem
        );

    // Validate POST response
    expect(addCartResponse.response.status()).toBe(
        STATUS_CODES.CREATED
    );

    // Get cart
    const cartResponse =
        await shopperService.getShopperCart(
            shopperId
        );

    // Validate GET response
    expect(cartResponse.response.status()).toBe(
        STATUS_CODES.OK
    );

    // Find the item added above
    const addedItem =
        cartResponse.body.data.find(
            (item: any) =>
                item.itemId ===
                addCartResponse.body.data.itemId
        );

    // Verify item exists in cart
    expect(addedItem).toBeTruthy();

    // Verify product details
    expect(addedItem.productId).toBe(
        productId
    );

    expect(addedItem.quantity).toBe(
        cartItem.quantity
    );

    expect(addedItem.productName).toBe(
        addCartResponse.body.data.productName
    );

    expect(addedItem.productLink).toBe(
        addCartResponse.body.data.productLink
    );
});