import { ApiClient } from '../clients/api-client';
import { ENDPOINTS } from '../config/endpoints';
import { merchantByIdResponseSchema } from '../schemas/merchant-by-id-schema';
import { validateResponse } from '../utils/response-validator';
import { createMerchantResponseSchema } from '../schemas/merchant-schema';
import { merchantsByZoneResponseSchema } from '../schemas/merchants-by-zone-schema';
import { merchantsByStatusResponseSchema } from '../schemas/merchants-by-status-schema';


export class MerchantService {
    constructor(private apiClient: ApiClient) { }

    async createMerchant(merchantData: unknown) {
        const response = await this.apiClient.post(
            ENDPOINTS.MERCHANTS.CREATE,
            merchantData
        );

        const responseBody = await response.json();

        const validatedResponse = validateResponse(
            createMerchantResponseSchema,
            responseBody
        );

        return {
            response,
            data: validatedResponse
        };
    }

    async getMerchantById(merchantId: number) {
        const response = await this.apiClient.get(
            ENDPOINTS.MERCHANTS.BY_ID(merchantId)
        );

        const responseBody = await response.json();

        const validatedResponse = validateResponse(
            merchantByIdResponseSchema,
            responseBody
        );

        return {
            response,
            data: validatedResponse
        };
    }

    async getMerchantsByZone(zoneId = 'ALPHA') {
        const response = await this.apiClient.get(
            `${ENDPOINTS.MERCHANTS.ALL}?zoneId=${zoneId}`
        );

        const responseBody = await response.json();

        const validatedResponse = validateResponse(
            merchantsByZoneResponseSchema,
            responseBody
        );

        return {
            response,
            data: validatedResponse
        };
    }
    async getMerchantsByStatus(
        status = 'ACTIVE',
        zoneId = 'ALPHA'
    ) {
        const response = await this.apiClient.get(
            `${ENDPOINTS.MERCHANTS.BY_STATUS}?status=${status}&zoneId=${zoneId}`
        );

        const responseBody = await response.json();

        const validatedResponse = validateResponse(
            merchantsByStatusResponseSchema,
            responseBody
        );

        return {
            response,
            data: validatedResponse
        };
    }
    async updateMerchant(
        merchantId: number,
        merchantData: unknown
    ) {
        const response = await this.apiClient.put(
            ENDPOINTS.MERCHANTS.BY_ID(merchantId),
            merchantData
        );

        return response;
    }

    async updateMerchantStatus(
        merchantId: number,
        status: string
    ) {
        const response = await this.apiClient.patch(
            ENDPOINTS.MERCHANTS.UPDATE_STATUS(
                merchantId,
                status
            )
        );

        return response;
    }
}