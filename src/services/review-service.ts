import { ApiClient } from '../clients/api-client';
import { ENDPOINTS } from '../config/endpoints';
import {
    reviewResponseSchema,
    reviewsResponseSchema,
    deleteReviewResponseSchema
} from '../schemas/review-schema';
import { validateResponse } from '../utils/response-validator';

export class ReviewService {

    constructor(
        private apiClient: ApiClient
    ) {}

    async createReview(
        productId: number,
        reviewData: unknown
    ) {
        const response =
            await this.apiClient.post(
                ENDPOINTS.REVIEWS.CREATE(productId),
                reviewData
            );

        const responseBody =
            await response.json();

        validateResponse(
            reviewResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }

    async getProductReviews(
        productId: number
    ) {
        const response =
            await this.apiClient.get(
                ENDPOINTS.REVIEWS.BY_PRODUCT(productId)
            );

        const responseBody =
            await response.json();

        validateResponse(
            reviewsResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }

    async updateReview(
        reviewId: number,
        productId: number,
        reviewData: unknown
    ) {
        const response =
            await this.apiClient.put(
                ENDPOINTS.REVIEWS.UPDATE(
                    reviewId,
                    productId
                ),
                reviewData
            );

        const responseBody =
            await response.json();

        validateResponse(
            reviewResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }

    async deleteReview(
        reviewId: number,
        productId: number
    ) {
        const response =
            await this.apiClient.delete(
                ENDPOINTS.REVIEWS.DELETE(
                    reviewId,
                    productId
                )
            );

        const responseBody =
            await response.json();

        validateResponse(
            deleteReviewResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
}