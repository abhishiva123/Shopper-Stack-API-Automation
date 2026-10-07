import { ApiClient } from '../clients/api-client';
import { ENDPOINTS } from '../config/endpoints';
import {
    saveShopperCardResponseSchema,
    getShopperCardsResponseSchema,
    getAllShopperCardsResponseSchema,
    deleteShopperCardResponseSchema
} from '../schemas/shopper-card-schema';

import { validateResponse } from '../utils/response-validator';
export class BankService {

    constructor(
        private apiClient: ApiClient
    ) { }

    async getAllBanks() {
        const response =
            await this.apiClient.get(
                ENDPOINTS.BANKS.ALL
            );

        const responseBody =
            await response.json();

        return {
            response,
            body: responseBody
        };
    }
    async createCard(
        bankName: string,
        cardType: string,
        email: string,
        name: string,
        shopperId: number
    ) {
        const response =
            await this.apiClient.get(
                ENDPOINTS.CARDS.CREATE(
                    bankName,
                    cardType,
                    email,
                    name,
                    shopperId
                )
            );

        const responseBody =
            await response.json();

        return {
            response,
            body: responseBody
        };
    }
    async updateCardBalance(
        amount: number,
        cardNumber: string
    ) {
        const response =
            await this.apiClient.patch(
                ENDPOINTS.CARDS.UPDATE_BALANCE(
                    amount,
                    cardNumber
                )
            );

        const responseBody =
            await response.json();

        return {
            response,
            body: responseBody
        };
    }
    async validateCardWithAmount(
        amount: number,
        card: unknown
    ) {
        const response =
            await this.apiClient.post(
                ENDPOINTS.CARDS.TRANSACTION(amount),
                card
            );

        const responseBody =
            await response.json();

        return {
            response,
            body: responseBody
        };
    }
    async verifyCard(card: unknown) {
        const response =
            await this.apiClient.post(
                ENDPOINTS.CARDS.VERIFY,
                card
            );

        const responseBody =
            await response.json();

        return {
            response,
            body: responseBody
        };
    }
    async saveShopperCard(cardData: unknown) {
        const response = await this.apiClient.post(
            ENDPOINTS.CARDS.SAVE,
            cardData
        );

        const responseBody = await response.json();

        validateResponse(
            saveShopperCardResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
    async deleteShopperCard(cardId: number) {
        const response = await this.apiClient.delete(
            ENDPOINTS.CARDS.DELETE(cardId)
        );

        const responseBody = await response.json();

        validateResponse(
            deleteShopperCardResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
    async getShopperCards(
        shopperId: number,
        type: string
    ) {
        const response = await this.apiClient.get(
            ENDPOINTS.CARDS.GET_BY_SHOPPER(
                shopperId,
                type
            )
        );

        const responseBody = await response.json();

        validateResponse(
            getShopperCardsResponseSchema,
            responseBody
        );

        return {
            response,
            body: responseBody
        };
    }
    async getAllShopperCards(
        cardType: string,
        shopperId: number
    ) {
        const response = await this.apiClient.get(
            ENDPOINTS.CARDS.GET_ALL_BY_SHOPPER(
                cardType,
                shopperId
            )
        );

        const responseBody = await response.json();

        validateResponse(
            getAllShopperCardsResponseSchema,
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

        return {
            response,
            body: responseBody
        };
    }
}