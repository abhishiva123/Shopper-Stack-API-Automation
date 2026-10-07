import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createItemData
} from '../../../src/utils/test-data';
import type { CartItem } from '../../../src/schemas/cart-schema';

test('Delete one product from cart and verify remaining product', async ({
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


    // Login shopper
    await authService.login(
        shopperData.email,
        shopperData.password,
        'SHOPPER'
    );


    // Products to add
    const productToDelete = 100;
    const productToKeep = 51;


    // Add first product
    const firstCartItem =
        createItemData(productToDelete, 1);

    const firstAddResponse =
        await shopperService.addProductToCart(
            shopperId,
            firstCartItem
        );

    expect(
        firstAddResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    expect(
        firstAddResponse.body.data.productId
    ).toBe(
        productToDelete
    );


    // Add second product
    const secondCartItem =
        createItemData(productToKeep, 1);

    const secondAddResponse =
        await shopperService.addProductToCart(
            shopperId,
            secondCartItem
        );

    expect(
        secondAddResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    expect(
        secondAddResponse.body.data.productId
    ).toBe(
        productToKeep
    );


    // Delete first product
    const deleteResponse =
        await shopperService.deleteProductFromCart(
            shopperId,
            productToDelete
        );

    expect(
        deleteResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        deleteResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        deleteResponse.body.message
    ).toBe(
        'Success'
    );


    // Get cart after deletion
    const cartResponse =
        await shopperService.getShopperCart(
            shopperId
        );

    expect(
        cartResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );


    // Cart should not be null
    expect(
        cartResponse.body.data
    ).not.toBeNull();


    const remainingItems =
        cartResponse.body.data as CartItem[];


    // Deleted product should not be present
    const deletedProduct =
        remainingItems.find(
            (item: CartItem) =>
                item.productId === productToDelete
        );

    expect(
        deletedProduct
    ).toBeUndefined();


    // Second product should still be present
    const remainingProduct =
        remainingItems.find(
            (item: CartItem) =>
                item.productId === productToKeep
        );

    expect(
        remainingProduct
    ).toBeTruthy();


    expect(
        remainingProduct?.productId
    ).toBe(
        productToKeep
    );
});