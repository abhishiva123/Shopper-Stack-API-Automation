import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createShopperData } from '../../src/utils/test-data';

test('Login bank account', async ({
    shopperService,
    authService,
    bankAccountService
}) => {

    // Create shopper
    const shopperData = createShopperData();

    const createShopperResponse =
        await shopperService.createShopper(
            shopperData
        );

    expect(
        createShopperResponse.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    const shopperResponseBody =
        await createShopperResponse.json();

    const shopperId =
        shopperResponseBody.data.userId;

    expect(shopperId).toBeTruthy();


    // Login shopper
    const shopperLoginResponse =
        await authService.login(
            shopperData.email,
            shopperData.password,
            'SHOPPER'
        );

    expect(
        shopperLoginResponse.status()
    ).toBe(
        STATUS_CODES.OK
    );


    // Create bank account
    const createBankAccountResponse =
        await bankAccountService.createBankAccount(
            'IDHC',
            shopperData.email,
            shopperId
        );

    expect(
        createBankAccountResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    const bankAccount =
        createBankAccountResponse.body.data;


    // Login to bank account
    const loginResponse =
        await bankAccountService.loginBankAccount(
            'IDHC',
            shopperData.email,
            bankAccount.password,
            'SHOPPER'
        );


    // HTTP status
    expect(
        loginResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );


    // API status
    expect(
        loginResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );


    // Message
    expect(
        loginResponse.body.message
    ).toBe(
        'Success'
    );


    // Response data
    const loggedInBankAccount =
        loginResponse.body.data;


    // Verify same bank account
    expect(
        loggedInBankAccount.bankAccountId
    ).toBe(
        bankAccount.bankAccountId
    );

    expect(
        loggedInBankAccount.bankAccountNumber
    ).toBe(
        bankAccount.bankAccountNumber
    );


    // Verify ownership
    expect(
        loggedInBankAccount.shopperId
    ).toBe(
        shopperId
    );

    expect(
        loggedInBankAccount.email
    ).toBe(
        shopperData.email
    );


    // Verify bank
    expect(
        loggedInBankAccount.bankName
    ).toBe(
        bankAccount.bankName
    );


    // Verify account state
    expect(
        loggedInBankAccount.balance
    ).toBe(
        bankAccount.balance
    );
});