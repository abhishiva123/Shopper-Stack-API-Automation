import { ApiClient } from '../clients/api-client';
import { ENDPOINTS } from '../config/endpoints';
import { createShopperResponseSchema } from '../schemas/shopper-schema';
import { validateResponse } from '../utils/response-validator';
import { createAddressResponseSchema, addressByIdResponseSchema, addressListResponseSchema } from '../schemas/address-schema';
import { addWishlistResponseSchema } from '../schemas/wishlist-schema';
import { cartResponseSchema, cartItemResponseSchema, deleteCartResponseSchema } from '../schemas/cart-schema';
import {
    shopperOrdersResponseSchema,
    shopperOrderResponseSchema
} from '../schemas/order-schema';
import { shopperLikesResponseSchema } from '../schemas/likes-schema';


export class ShopperService {
    constructor(private apiClient: ApiClient) { }

    async createShopper(shopperData: unknown) {
        const response = await this.apiClient.post(
            ENDPOINTS.SHOPPERS.CREATE,
            shopperData
        );

        const responseBody = await response.json();

        validateResponse(
            createShopperResponseSchema,
            responseBody
        );

        return response;
    }

    async getShopperById(shopperId: number) {
        const response = await this.apiClient.get(
            ENDPOINTS.SHOPPERS.BY_ID(shopperId)
        );

        const responseBody = await response.json();

        return response;

    }
    async updateShopper(
        shopperId: number,
        shopperData: unknown
    ) {
        const response = await this.apiClient.patch(
            ENDPOINTS.SHOPPERS.BY_ID(shopperId),
            shopperData
        );

        return response;
    }

    async addShopperAddress(
        shopperId: number,
        addressData: unknown
    ) {
        const response = await this.apiClient.post(
            ENDPOINTS.SHOPPERS.ADDRESSES(shopperId),
            addressData
        );

        const responseBody = await response.json();

        // Only validate the response
        validateResponse(
            createAddressResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
    async getShopperAddressById(
        shopperId: number,
        addressId: number
    ) {
        const response = await this.apiClient.get(
            ENDPOINTS.SHOPPERS.ADDRESS_BY_ID(
                shopperId,
                addressId
            )
        );

        const responseBody = await response.json();

        // Validate only
        validateResponse(
            addressByIdResponseSchema,
            responseBody
        );

        // Return original API response body
        return {
            response,
            body: responseBody
        };
    }
    async getShopperAddresses(
        shopperId: number
    ) {
        const response = await this.apiClient.get(
            ENDPOINTS.SHOPPERS.ADDRESSES(shopperId)
        );

        const responseBody = await response.json();

        // Validate only
        validateResponse(
            addressListResponseSchema,
            responseBody
        );

        // Return original API response
        return {
            response,
            body: responseBody
        };
    }
    async updateShopperAddress(
        shopperId: number,
        addressId: number,
        addressData: unknown
    ) {
        const response = await this.apiClient.put(
            ENDPOINTS.SHOPPERS.ADDRESS_BY_ID(
                shopperId,
                addressId
            ),
            addressData
        );

        const responseBody = await response.json();

        // Validate only
        validateResponse(
            addressByIdResponseSchema,
            responseBody
        );

        // Return original API response
        return {
            response,
            body: responseBody
        };
    }
    async deleteShopperAddress(
        shopperId: number,
        addressId: number
    ) {
        const response = await this.apiClient.delete(
            ENDPOINTS.SHOPPERS.ADDRESS_BY_ID(
                shopperId,
                addressId
            )
        );

        return response;
    }
    async getShopperWishlist(
        shopperId: number
    ) {
        const response = await this.apiClient.get(
            ENDPOINTS.SHOPPERS.WISHLIST(shopperId)
        );

        const responseBody = await response.json();

        return {
            response,
            body: responseBody
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

        // Validate only
        validateResponse(
            addWishlistResponseSchema,
            responseBody
        );

        // Return original API response
        return {
            response,
            body: responseBody
        };
    }
    async deleteProductFromWishlist(
        shopperId: number,
        productId: number
    ) {
        const response = await this.apiClient.delete(
            ENDPOINTS.SHOPPERS.WISHLIST_PRODUCT(
                shopperId,
                productId
            )
        );

        return response;
    }
    async getShopperCart(
        shopperId: number
    ) {
        const response = await this.apiClient.get(
            ENDPOINTS.SHOPPERS.CART(shopperId)
        );

        const responseBody = await response.json();

        // Validate only
        validateResponse(
            cartResponseSchema,
            responseBody
        );

        // Return original API response
        return {
            response,
            body: responseBody
        };
    }
    async addProductToCart(
        shopperId: number,
        itemData: unknown
    ) {
        const response = await this.apiClient.post(
            ENDPOINTS.SHOPPERS.CART(shopperId),
            itemData
        );

        const responseBody = await response.json();

        // Validate only
        validateResponse(
            cartItemResponseSchema,
            responseBody
        );

        // Return original API response
        return {
            response,
            body: responseBody
        };
    }
    async updateCartItem(
        shopperId: number,
        itemId: number,
        itemData: unknown
    ) {
        const response = await this.apiClient.put(
            ENDPOINTS.SHOPPERS.CART_ITEM(
                shopperId,
                itemId
            ),
            itemData
        );

        const responseBody = await response.json();

        // Validate only
        validateResponse(
            cartItemResponseSchema,
            responseBody
        );

        // Return original API response
        return {
            response,
            body: responseBody
        };
    }
    async deleteProductFromCart(
        shopperId: number,
        productId: number
    ) {
        const response = await this.apiClient.delete(
            ENDPOINTS.SHOPPERS.CART_PRODUCT(
                shopperId,
                productId
            )
        );

        const responseBody = await response.json();

        validateResponse(
            deleteCartResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
    async getShopperOrders(
        shopperId: number
    ) {
        const response = await this.apiClient.get(
            ENDPOINTS.SHOPPERS.ORDERS(shopperId)
        );

        const responseBody =
            await response.json();

        validateResponse(
            shopperOrdersResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
    async placeOrder(
        shopperId: number,
        orderData: unknown
    ) {
        const response = await this.apiClient.post(
            ENDPOINTS.SHOPPERS.ORDERS(shopperId),
            orderData
        );

        const responseBody =
            await response.json();

        validateResponse(
            shopperOrderResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
    async updateOrderStatus(
        shopperId: number,
        orderId: number,
        status: string
    ) {
        const response = await this.apiClient.patch(
            `${ENDPOINTS.SHOPPERS.ORDER_BY_ID(
                shopperId,
                orderId
            )}?status=${status}`
        );

        const responseBody =
            await response.json();

        validateResponse(
            shopperOrderResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
    async getOrderInvoice(
        shopperId: number,
        orderId: number
    ) {
        const response = await this.apiClient.get(
            ENDPOINTS.SHOPPERS.ORDER_INVOICE(
                shopperId,
                orderId
            ),
            {
                Accept: 'application/pdf'
            }
        );

        return response;
    }

    async createAddress(
        shopperId: number,
        addressData: unknown
    ) {
        const response = await this.apiClient.post(
            ENDPOINTS.SHOPPERS.ADDRESSES(shopperId),
            addressData
        );

        const responseBody = await response.json();

        validateResponse(
            createAddressResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
    async updateShopperLikes(
        shopperId: number,
        likes: Record<string, string[]>
    ) {
        const response =
            await this.apiClient.patch(
                ENDPOINTS.SHOPPERS.LIKES(shopperId),
                likes
            );

        const responseBody =
            await response.json();

        validateResponse(
            shopperLikesResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
    async getShopperLikes(
        shopperId: number
    ) {
        const response =
            await this.apiClient.get(
                ENDPOINTS.SHOPPERS.LIKES(shopperId)
            );

        const responseBody =
            await response.json();

        return {
            response,
            body: responseBody
        };
    }
   async deleteShopperLikes(
    shopperId: number,
    category: string
) {
    const response =
        await this.apiClient.delete(
            ENDPOINTS.SHOPPERS.DELETE_LIKES(
                shopperId,
                category
            )
        );

    const responseBody =
        await response.json();

    validateResponse(
        shopperLikesResponseSchema,
        responseBody
    );

    return {
        response,
        body: responseBody
    };
}
}