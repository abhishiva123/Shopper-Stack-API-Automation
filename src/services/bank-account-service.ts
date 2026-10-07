import { ApiClient } from '../clients/api-client';
import { ENDPOINTS } from '../config/endpoints';
import {
    createBankAccountResponseSchema,
    getBankAccountsResponseSchema,
    updateBankAccountResponseSchema,
    loginBankAccountResponseSchema
} from '../schemas/bank-account-schema';
import { validateResponse } from '../utils/response-validator';

export class BankAccountService {

    constructor(
        private apiClient: ApiClient
    ) { }

    async createBankAccount(
        bankName: string,
        email: string,
        shopperId: number
    ) {

        const response =
            await this.apiClient.post(
                ENDPOINTS.BANK_ACCOUNTS.CREATE(
                    bankName,
                    email,
                    shopperId
                )
            );

        const responseBody =
            await response.json();

        validateResponse(
            createBankAccountResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }

    async getBankAccounts(
        shopperId: number
    ) {

        const response =
            await this.apiClient.get(
                ENDPOINTS.BANK_ACCOUNTS.GET_BY_SHOPPER(
                    shopperId
                )
            );

        const responseBody =
            await response.json();

        validateResponse(
            getBankAccountsResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }

    async updateBankAccount(
        action: string,
        amount: number,
        number: string
    ) {
        const response =
            await this.apiClient.patch(
                ENDPOINTS.BANK_ACCOUNTS.UPDATE(
                    action,
                    amount,
                    number
                )
            );

        const responseBody = await response.json();

        validateResponse(
            updateBankAccountResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
    async loginBankAccount(
        bankName: string,
        email: string,
        password: string,
        role: string
    ) {
        const response =
            await this.apiClient.post(
                ENDPOINTS.BANK_ACCOUNTS.LOGIN(bankName),
                {
                    email,
                    password,
                    role
                }
            );

        const responseBody = await response.json();

        validateResponse(
            loginBankAccountResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
}