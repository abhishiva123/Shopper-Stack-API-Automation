import { ApiClient } from '../clients/api-client';
import { ENDPOINTS } from '../config/endpoints';
import { productResponseSchema } from '../schemas/product-schema';
import { validateResponse } from '../utils/response-validator';
import { productByIdResponseSchema } from '../schemas/product-by-id-schema';

export class ProductService {
    constructor(private apiClient: ApiClient) { }

    async getDefaultProducts(zoneId = 'ALPHA') {
        const response = await this.apiClient.get(
            `${ENDPOINTS.PRODUCTS.DEFAULT}?zoneId=${zoneId}`
        );

        const responseBody = await response.json();

        const validatedResponse = validateResponse(
            productResponseSchema,
            responseBody
        );

        return validatedResponse;
    }
    async getProductById(productId: number) {
        const response = await this.apiClient.get(
            ENDPOINTS.PRODUCTS.BY_ID(productId)
        );

        const responseBody = await response.json();

        const validatedResponse = validateResponse(
            productByIdResponseSchema,
            responseBody
        );

        return validatedResponse;
    }
    async getProductsByMerchant(merchantId: number) {
        const response = await this.apiClient.get(
            ENDPOINTS.PRODUCTS.BY_MERCHANT(merchantId)
        );

        const responseBody = await response.json();

        const validatedResponse = validateResponse(
            productResponseSchema,
            responseBody
        );

        return validatedResponse;
    }
    async getAllProducts(zoneId = 'ALPHA') {
        const response = await this.apiClient.get(
            `${ENDPOINTS.PRODUCTS.ALL}?zoneId=${zoneId}`
        );

        const responseBody = await response.json();

        const validatedResponse = validateResponse(
            productResponseSchema,
            responseBody
        );

        return {
            response,
            data: validatedResponse
        };
    }
    async addProductToWishlist(
    shopperId: number,
    itemData: unknown
) {
    const response = await this.apiClient.post(
        ENDPOINTS.SHOPPERS.WISHLIST(shopperId),
        itemData
    );

    const responseBody = await response.json();

    return {
        response,
        body: responseBody
    };
}
async getShopperCards(
    shopperId: number,
    type: string
) {
    const response =
        await this.apiClient.get(
            ENDPOINTS.CARDS.GET_BY_SHOPPER(
                shopperId,
                type
            )
        );

    const responseBody =
        await response.json();

    return {
        response,
        body: responseBody
    };
}
}