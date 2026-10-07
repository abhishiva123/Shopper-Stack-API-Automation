import { test, expect } from '../../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../../src/config/status-codes';
import {
    createShopperData,
    createItemData,
    createAddressData,
    createOrderData
} from '../../../src/utils/test-data';

test('Update shopper order status', async ({
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


    // Place order using the created address
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


    // Get order ID
    const orderId =
        orderResponse.body.data.orderId;


    // Update order status
    const updateResponse =
        await shopperService.updateOrderStatus(
            shopperId,
            orderId,
            'OUT_FOR_DELIVERY'
        );


    // Validate HTTP status
    expect(
        updateResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );


    // Validate API statusCode
    expect(
        updateResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );


    // Validate updated order
    expect(
        updateResponse.body.data.orderId
    ).toBe(
        orderId
    );

    expect(
        updateResponse.body.data.orderStatus
    ).toBe(
        'OUT_FOR_DELIVERY'
    );
});