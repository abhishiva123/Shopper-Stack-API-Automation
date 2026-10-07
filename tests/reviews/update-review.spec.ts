import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import {
    createShopperData,
    createItemData,
    createAddressData,
    createOrderData,
    createReviewData
} from '../../src/utils/test-data';

test('Update product review', async ({
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
        updateOrderResponse.body.data.orderStatus
    ).toBe(
        'DELIVERED'
    );


    // Create review
    const reviewData =
        createReviewData(
            shopperId,
            shopperData.firstName
        );

    const createReviewResponse =
        await reviewService.createReview(
            productId,
            reviewData
        );

    expect(
        [STATUS_CODES.OK, STATUS_CODES.CREATED]
    ).toContain(
        createReviewResponse.response.status()
    );


    // Get review ID
    const reviewId =
        createReviewResponse.body.data.reviewId;

    expect(reviewId).toBeTruthy();


    // Create updated review data
    const updatedReview =
        createReviewData(
            shopperId,
            shopperData.firstName
        );

    updatedReview.heading =
        'Updated Product Review';

    updatedReview.description =
        'Updated review description';

    updatedReview.rating = 4;


    // Update review
    const updateResponse =
        await reviewService.updateReview(
            reviewId,
            productId,
            updatedReview
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


    // Validate updated review
    expect(
        updateResponse.body.data.reviewId
    ).toBe(
        reviewId
    );

    expect(
        updateResponse.body.data.heading
    ).toBe(
        updatedReview.heading
    );

    expect(
        updateResponse.body.data.description
    ).toBe(
        updatedReview.description
    );

    expect(
        updateResponse.body.data.rating
    ).toBe(
        updatedReview.rating
    );
});