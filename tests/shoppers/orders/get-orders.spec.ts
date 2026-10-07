import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createItemData,
    createAddressData,
    createOrderData
} from '../../../src/utils/test-data';

import type { ShopperOrder } from '../../../src/schemas/order-schema';

test('Get shopper order history', async ({
    shopperService,
    authService
}) => {

    // Create shopper
    const shopperData = createShopperData();

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


    // Create address
    const addressData =
        createAddressData();

    const addressResponse =
        await shopperService.createAddress(
            shopperId,
            addressData
        );

    expect(
        addressResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    const address =
        addressResponse.body.data;


    // Add product to cart
    const productId = 51;

    const cartItem =
        createItemData(
            productId,
            1
        );

    const addCartResponse =
        await shopperService.addProductToCart(
            shopperId,
            cartItem
        );

    expect(
        addCartResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );


    // Place order
    const orderData =
        createOrderData(address);

    const orderResponse =
        await shopperService.placeOrder(
            shopperId,
            orderData
        );

    expect(
        orderResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );


    // Get created order ID
    const orderId =
        orderResponse.body.data.orderId;


    // Get order history
    const ordersResponse =
        await shopperService.getShopperOrders(
            shopperId
        );


    // Validate HTTP status
    expect(
        ordersResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );


    // Verify order exists
    const order =
        ordersResponse.body.data.find(
            (item: ShopperOrder) =>
                item.orderId === orderId
        );

    expect(order).toBeTruthy();

    expect(order?.shopperId).toBe(
        shopperId
    );

    expect(order?.orderStatus).toBe(
        'PLACED'
    );
});