import { ApiClient } from '../clients/api-client';
import { ENDPOINTS } from '../config/endpoints';
import { validateResponse } from '../utils/response-validator';
import { createAdminResponseSchema,getAdminResponseSchema,adminMerchantListResponseSchema,merchantStatusResponseSchema} from '../schemas/admin-schema';


export class AdminService {

    constructor(
        private apiClient: ApiClient
    ) {}

    async createAdmin(
        adminData: unknown
    ) {
        const response =
            await this.apiClient.post(
                ENDPOINTS.ADMIN.CREATE,
                adminData
            );

        const responseBody =
            await response.json();

        validateResponse(
            createAdminResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
    async getAdminById(
    adminId: number
) {
    const response =
        await this.apiClient.get(
            ENDPOINTS.ADMIN.BY_ID(adminId)
        );

    const responseBody =
        await response.json();

    validateResponse(
        getAdminResponseSchema,
        responseBody
    );

    return {
        response,
        body: responseBody
    };
}
async updateAdmin(
    adminId: number,
    adminData: unknown
) {
    const response =
        await this.apiClient.put(
            ENDPOINTS.ADMIN.BY_ID(adminId),
            adminData
        );

    const responseBody =
        await response.json();

    validateResponse(
        createAdminResponseSchema,
        responseBody
    );

    return {
        response,
        body: responseBody
    };
}
async getMerchantsByZone(
    zoneId: string
) {
    const response =
        await this.apiClient.get(
            ENDPOINTS.ADMIN_ACTIONS.GET_MERCHANTS_BY_ZONE(
                zoneId
            )
        );

    const responseBody =
        await response.json();

    validateResponse(
        adminMerchantListResponseSchema,
        responseBody
    );

    return {
        response,
        body: responseBody
    };
}
async updateMerchantStatus(
    merchantId: number,
    status: string
) {
    const response =
        await this.apiClient.patch(
            ENDPOINTS.ADMIN_ACTIONS.UPDATE_MERCHANT_STATUS(
                merchantId,
                status
            )
        );

    const responseBody =
        await response.json();

    validateResponse(
        merchantStatusResponseSchema,
        responseBody
    );

    return {
        response,
        body: responseBody
    };
}
async getMerchantsByStatus(
    status: string,
    zoneId: string
) {
    const response =
        await this.apiClient.get(
            ENDPOINTS.ADMIN_ACTIONS.GET_MERCHANTS_BY_STATUS(
                status,
                zoneId
            )
        );

    const responseBody =
        await response.json();

    validateResponse(
        adminMerchantListResponseSchema,
        responseBody
    );

    return {
        response,
        body: responseBody
    };
}
}