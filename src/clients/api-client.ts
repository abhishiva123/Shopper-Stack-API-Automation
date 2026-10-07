import {
    APIRequestContext,
    APIResponse
} from '@playwright/test';

import { TokenManager } from '../utils/token-manager';

export class ApiClient {
    constructor(
        private request: APIRequestContext,
        private tokenManager?: TokenManager
    ) { }

    private getHeaders(): Record<string, string> {
        const token = this.tokenManager?.getToken();

        return token
            ? { Authorization: `Bearer ${token}` }
            : {};
    }

    private logRequest(
        method: string,
        endpoint: string,
        data?: unknown
    ) {
        console.log('\n========== REQUEST ==========');
        console.log('Method:', method);
        console.log('Endpoint:', endpoint);

        if (data) {
            console.log('Request Body:', data);
        }

        console.log('=============================');
    }

    private async logResponse(
        response: APIResponse
    ) {
        const responseBody = await response.text();

        console.log('========== RESPONSE ==========');
        console.log('Status:', response.status());
        console.log('Response Body:', responseBody);
        console.log('==============================\n');
    }

async get(
    endpoint: string,
    headers?: Record<string, string>
) {
    this.logRequest('GET', endpoint);

    const response = await this.request.get(endpoint, {
        headers: {
            ...this.getHeaders(),
            ...headers
        }
    });

    await this.logResponse(response);

    return response;
}

    async post(endpoint: string, data?: unknown) {
        this.logRequest('POST', endpoint, data);

        const response = await this.request.post(endpoint, {
            data,
            headers: this.getHeaders()
        });

        await this.logResponse(response);

        return response;
    }

    async put(endpoint: string, data?: unknown) {
        this.logRequest('PUT', endpoint, data);

        const response = await this.request.put(endpoint, {
            data,
            headers: this.getHeaders()
        });

        await this.logResponse(response);

        return response;
    }

    async patch(endpoint: string, data?: unknown) {
        this.logRequest('PATCH', endpoint, data);

        const response = await this.request.patch(endpoint, {
            data,
            headers: this.getHeaders()
        });

        await this.logResponse(response);

        return response;
    }

    async delete(endpoint: string) {
        this.logRequest('DELETE', endpoint);

        const response = await this.request.delete(endpoint, {
            headers: this.getHeaders()
        });

        await this.logResponse(response);

        return response;
    }
}