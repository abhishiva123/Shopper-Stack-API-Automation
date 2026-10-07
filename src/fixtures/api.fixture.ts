import { test as base } from '@playwright/test';
import { ApiClient } from '../clients/api-client';
import { ProductService } from '../services/product-service';
import { AuthService } from '../services/auth-service';
import { ShopperService } from '../services/shopper-service';
import { TokenManager } from '../utils/token-manager';
import { MerchantService } from '../services/merchant-service';
import { ReviewService } from '../services/review-service';
import { BankService } from '../services/bank-service';
import { BankAccountService } from '../services/bank-account-service';
import { WalletService } from '../services/wallet-service';
import { AdminService } from '../services/admin-service';

type ApiFixtures = {
    apiClient: ApiClient;
    productService: ProductService;
    authService: AuthService;
    shopperService: ShopperService;
    tokenManager: TokenManager;
    merchantService: MerchantService;
    reviewService: ReviewService;
    bankService: BankService;
    bankAccountService: BankAccountService;
    walletService: WalletService;
    adminService: AdminService;
};

export const test = base.extend<ApiFixtures>({
    apiClient: async ({ request, tokenManager }, use) => {
        const apiClient = new ApiClient(
            request,
            tokenManager
        );

        await use(apiClient);
    },

    productService: async ({ apiClient }, use) => {
        const productService = new ProductService(apiClient);

        await use(productService);
    },

    authService: async ({ apiClient, tokenManager }, use) => {
        const authService = new AuthService(
            apiClient,
            tokenManager
        );

        await use(authService);
    },

    shopperService: async ({ apiClient }, use) => {
        const shopperService = new ShopperService(apiClient);

        await use(shopperService);
    },
    tokenManager: async ({ }, use) => {
        const tokenManager = new TokenManager();

        await use(tokenManager);
    },
    merchantService: async ({ apiClient }, use) => {
        const merchantService = new MerchantService(apiClient);

        await use(merchantService);
    },
    reviewService: async ({ apiClient }, use) => {
        const reviewService =
            new ReviewService(apiClient);

        await use(reviewService);
    },
    bankService: async ({ apiClient }, use) => {
        const bankService =
            new BankService(apiClient);

        await use(bankService);
    },
    bankAccountService: async ({ apiClient }, use) => {
        const bankAccountService = new BankAccountService(apiClient);
        await use(bankAccountService);
    },
    walletService: async ({ apiClient }, use) => {
        const walletService =
            new WalletService(apiClient);

        await use(walletService);
    },
    adminService: async ({ apiClient }, use) => {
        const adminService =
            new AdminService(apiClient);

        await use(adminService);
    },

});

export { expect } from '@playwright/test';
