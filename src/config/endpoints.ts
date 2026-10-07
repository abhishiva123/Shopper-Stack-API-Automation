export const ENDPOINTS = {
    PRODUCTS: {
        DEFAULT: 'products/alpha',
        ALL: 'products',
        BY_ID: (productId: number) => `products/${productId}`,
        BY_MERCHANT: (merchantId: number) =>
            `products/merchant/${merchantId}`
    },

USERS: {
    LOGIN: 'users/login',

    FORGOT_PASSWORD: 'users/forgot-password',

    RESET_PASSWORD: 'users/reset-password'
},

    SHOPPERS: {
        CREATE: 'shoppers',

        BY_ID: (shopperId: number) =>
            `shoppers/${shopperId}`,

        // ADDRESS
        ADDRESSES: (shopperId: number) =>
            `shoppers/${shopperId}/address`,

        ADDRESS_BY_ID: (
            shopperId: number,
            addressId: number
        ) =>
            `shoppers/${shopperId}/address/${addressId}`,

        // WISHLIST
        WISHLIST: (shopperId: number) =>
            `shoppers/${shopperId}/wishlist`,

        WISHLIST_PRODUCT: (
            shopperId: number,
            productId: number
        ) =>
            `shoppers/${shopperId}/wishlist/${productId}`,

        // CART
        CART: (shopperId: number) =>
            `shoppers/${shopperId}/carts`,

        CART_ITEM: (
            shopperId: number,
            itemId: number
        ) =>
            `shoppers/${shopperId}/carts/${itemId}`,

        CART_PRODUCT: (
            shopperId: number,
            productId: number
        ) =>
            `shoppers/${shopperId}/carts/${productId}`,

        // ORDERS
        ORDERS: (shopperId: number) =>
            `shoppers/${shopperId}/orders`,

        ORDER_BY_ID: (
            shopperId: number,
            orderId: number
        ) =>
            `shoppers/${shopperId}/orders/${orderId}`,

        ORDER_INVOICE: (
            shopperId: number,
            orderId: number
        ) =>
            `shoppers/${shopperId}/orders/${orderId}/invoice`,
        LIKES: (shopperId: number) =>
            `shoppers/likes?shopperId=${shopperId}`,
        DELETE_LIKES: (
            shopperId: number,
            category: string
        ) =>
            `shoppers/likes?category=${encodeURIComponent(category)}&shopperId=${shopperId}`,
    },
    REVIEWS: {
        CREATE: (productId: number) =>
            `reviews?productId=${productId}`,

        BY_PRODUCT: (productId: number) =>
            `reviews/${productId}`,

        UPDATE: (
            reviewId: number,
            productId: number
        ) =>
            `reviews/${reviewId}?productId=${productId}`,

        DELETE: (
            reviewId: number,
            productId: number
        ) =>
            `reviews/${reviewId}?productId=${productId}`
    },
    MERCHANTS: {
        CREATE: 'merchants',
        ALL: 'merchants',
        BY_ID: (merchantId: number) => `merchants/${merchantId}`,
        BY_STATUS: 'merchants/status/zoneId',

        UPDATE_STATUS: (merchantId: number, status: string) =>
            `merchants/${merchantId}/status?status=${status}`
    },
    BANKS: {
        ALL: 'banks'
    },

    CARDS: {
        CREATE: (
            bankName: string,
            cardType: string,
            email: string,
            name: string,
            shopperId: number
        ) =>
            `cards?bankName=${encodeURIComponent(bankName)}` +
            `&cardType=${encodeURIComponent(cardType)}` +
            `&email=${encodeURIComponent(email)}` +
            `&name=${encodeURIComponent(name)}` +
            `&shopperId=${shopperId}`,

        SAVE: 'cards',

        DELETE: (cardId: number) =>
            `cards/${cardId}`,

        UPDATE_BALANCE: (
            amount: number,
            cardNumber: string
        ) =>
            `cards?amount=${amount}&cardNumber=${encodeURIComponent(cardNumber)}`,

        TRANSACTION: (amount: number) =>
            `cards/transaction?amount=${amount}`,

        VERIFY: 'cards/verify',
        GET_BY_SHOPPER: (
            shopperId: number,
            type: string
        ) =>
            `cards/${shopperId}?type=${encodeURIComponent(type)}`,
        GET_ALL_BY_SHOPPER: (
            cardType: string,
            shopperId: number
        ) =>
            `shoppers/cards?cardType=${encodeURIComponent(cardType)}&shopperId=${shopperId}`,
    },
    BANK_ACCOUNTS: {

        CREATE: (
            bankName: string,
            email: string,
            shopperId: number
        ) =>
            `bankaccounts?bankName=${encodeURIComponent(bankName)}` +
            `&email=${encodeURIComponent(email)}` +
            `&shopperId=${shopperId}`,

        GET_BY_SHOPPER: (
            shopperId: number
        ) =>
            `bankaccounts?shopperId=${shopperId}`,
        UPDATE: (
            action: string,
            amount: number,
            number: string
        ) =>
            `bankaccounts?action=${encodeURIComponent(action)}` +
            `&amount=${amount}` +
            `&number=${encodeURIComponent(number)}`,

        LOGIN: (bankName: string) =>
            `bankaccounts/login?bankName=${encodeURIComponent(bankName)}`
    },
    WALLETS: (shopperId: number) =>
        `shoppers/${shopperId}/wallets`,

    ADMIN: {
        CREATE: 'admin',
        BY_ID: (adminId: number) =>
            `admin/${adminId}`
    },

    ADMIN_ACTIONS: {

    GET_MERCHANTS_BY_ZONE: (
        zoneId: string
    ) =>
        `merchants?zoneId=${encodeURIComponent(zoneId)}`,

    UPDATE_MERCHANT_STATUS: (
        merchantId: number,
        status: string
    ) =>
        `merchants/${merchantId}/status?status=${encodeURIComponent(status)}`,

    GET_MERCHANTS_BY_STATUS: (
        status: string,
        zoneId: string
    ) =>
        `merchants/status/zoneId?status=${encodeURIComponent(status)}&zoneId=${encodeURIComponent(zoneId)}`
},
};


