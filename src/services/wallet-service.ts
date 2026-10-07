import { ApiClient } from '../clients/api-client';
import { ENDPOINTS } from '../config/endpoints';

export class WalletService {

    constructor(
        private apiClient: ApiClient
    ) { }

    async getWalletTransactions(
        shopperId: number
    ) {
        const response =
            await this.apiClient.get(
                ENDPOINTS.WALLETS(shopperId)
            );

        const responseBody =
            await response.json();

        return {
            response,
            body: responseBody
        };
    }
}