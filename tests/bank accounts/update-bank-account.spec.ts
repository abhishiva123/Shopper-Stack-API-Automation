import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createShopperData } from '../../src/utils/test-data';

test('Update bank account', async ({
    shopperService,
    authService,
    bankAccountService
}) => {

    // -----------------------------
    // 1. Create shopper
    // -----------------------------

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


    // -----------------------------
    // 2. Login as shopper
    // -----------------------------

    const loginResponse =
        await authService.login(
            shopperData.email,
            shopperData.password,
            'SHOPPER'
        );

    expect(
        loginResponse.status()
    ).toBe(
        STATUS_CODES.OK
    );


    // -----------------------------
    // 3. Create bank account
    // -----------------------------

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


    // -----------------------------
    // 4. Validate created account
    // -----------------------------

    expect(
        bankAccount.bankAccountId
    ).toBeTruthy();

    expect(
        bankAccount.bankAccountNumber
    ).toBeTruthy();

    expect(
        bankAccount.shopperId
    ).toBe(
        shopperId
    );

    expect(
        bankAccount.email
    ).toBe(
        shopperData.email
    );

    expect(
        bankAccount.bankName
    ).toBe(
        'IDHC'
    );

    expect(
        bankAccount.balance
    ).toBeGreaterThan(0);


    // -----------------------------
    // 5. Store original values
    // -----------------------------

    const initialBalance =
        bankAccount.balance;

    const bankAccountNumber =
        bankAccount.bankAccountNumber;

    const bankAccountId =
        bankAccount.bankAccountId;

    const amount = 1000;


    // -----------------------------
    // 6. Update bank account
    // -----------------------------

    const updateResponse =
        await bankAccountService.updateBankAccount(
            'DEPOSIT',
            amount,
            bankAccountNumber
        );


    // -----------------------------
    // 7. Validate HTTP response
    // -----------------------------

    expect(
        updateResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );


    // -----------------------------
    // 8. Validate API response
    // -----------------------------

    expect(
        updateResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        updateResponse.body.message
    ).toBe(
        'Success'
    );


    // -----------------------------
    // 9. Validate returned account
    // -----------------------------

    const updatedBankAccount =
        updateResponse.body.data;

    expect(
        updatedBankAccount.bankAccountId
    ).toBe(
        bankAccountId
    );

    expect(
        updatedBankAccount.bankAccountNumber
    ).toBe(
        bankAccountNumber
    );

    expect(
        updatedBankAccount.shopperId
    ).toBe(
        shopperId
    );

    expect(
        updatedBankAccount.email
    ).toBe(
        shopperData.email
    );

    expect(
        updatedBankAccount.bankName
    ).toBe(
        'IDHC'
    );


    // -----------------------------
    // 10. Validate balance update
    // -----------------------------

    expect(
        updatedBankAccount.balance
    ).toBe(
        initialBalance - amount
    );
});