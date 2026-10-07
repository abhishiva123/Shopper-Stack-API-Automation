import { ApiClient } from '../clients/api-client';
import { ENDPOINTS } from '../config/endpoints';
import { TokenManager } from '../utils/token-manager';
import { loginResponseSchema,forgotPasswordResponseSchema,resetPasswordResponseSchema } from '../schemas/auth-schema';
import { validateResponse } from '../utils/response-validator';
import { STATUS_CODES } from '../config/status-codes';

export class AuthService {
    constructor(
        private apiClient: ApiClient,
        private tokenManager: TokenManager
    ) { }

    async login(
        email: string,
        password: string,
        role: string
    ) {
        const response = await this.apiClient.post(
            ENDPOINTS.USERS.LOGIN,
            {
                email,
                password,
                role
            }
        );

        const responseBody = await response.json();

        const validatedResponse = validateResponse(
            loginResponseSchema,
            responseBody
        ); 
        this.tokenManager.setToken(
            validatedResponse.data.jwtToken
        );

        return response;
    }

}