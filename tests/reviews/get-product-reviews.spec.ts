import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';

test('Get all reviews for a product', async ({
    reviewService
}) => {

    const productId = 51;

    const response =
        await reviewService.getProductReviews(
            productId
        );

    expect(
        response.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        response.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        Array.isArray(
            response.body.data
        )
    ).toBeTruthy();
});