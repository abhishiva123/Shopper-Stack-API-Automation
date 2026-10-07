import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import {
    createShopperData,
    createItemData,
    createAddressData,
    createOrderData,
    createReviewData
} from '../../src/utils/test-data';

test('Add review to product', async ({
    shopperService,
    authService,
    reviewService
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


    // Get order ID
    const orderId =
        orderResponse.body.data.orderId;

    expect(orderId).toBeTruthy();


    // Update order status to DELIVERED
    const updateOrderResponse =
        await shopperService.updateOrderStatus(
            shopperId,
            orderId,
            'DELIVERED'
        );

    expect(
        updateOrderResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        updateOrderResponse.body.data.orderId
    ).toBe(
        orderId
    );

    expect(
        updateOrderResponse.body.data.orderStatus
    ).toBe(
        'DELIVERED'
    );


    // Create review data
    const reviewData =
        createReviewData(
            shopperId,
            shopperData.firstName
        );


    // Add review
    const reviewResponse =
        await reviewService.createReview(
            productId,
            reviewData
        );


    // Validate HTTP status
    expect(
        [STATUS_CODES.OK, STATUS_CODES.CREATED]
    ).toContain(
        reviewResponse.response.status()
    );


    // Validate created review
    expect(
        reviewResponse.body.data.reviewId
    ).toBeTruthy();

    expect(
        reviewResponse.body.data.shopperId
    ).toBe(
        shopperId
    );

    expect(
        reviewResponse.body.data.heading
    ).toBe(
        reviewData.heading
    );

    expect(
        reviewResponse.body.data.description
    ).toBe(
        reviewData.description
    );

    expect(
        reviewResponse.body.data.rating
    ).toBe(
        reviewData.rating
    );
});