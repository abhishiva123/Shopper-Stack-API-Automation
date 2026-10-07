import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createAdminData, createMerchantData } from '../../src/utils/test-data';

test('Update merchant status', async ({
    adminService,
    authService,
    merchantService
}) => {

    // 1. Create Admin
    const adminData =
        createAdminData();

    const createAdminResponse =
        await adminService.createAdmin(
            adminData
        );

    expect(
        createAdminResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    // 2. Login as Admin
    const loginResponse =
        await authService.login(
            adminData.email,
            adminData.password,
            'ADMIN'
        );

    expect(
        loginResponse.status()
    ).toBe(
        STATUS_CODES.OK
    );

    // 3. Create Merchant
    const merchantData =
        createMerchantData();

    const createMerchantResponse =
        await merchantService.createMerchant(
            merchantData
        );

    expect(
        createMerchantResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    // 4. Get Merchant ID
    const merchantId =
        createMerchantResponse.data.data.userId;

    expect(
        merchantId
    ).toBeTruthy();

    // 5. Update Merchant Status
    const newStatus = 'BLOCKED';

    const updateResponse =
        await adminService.updateMerchantStatus(
            merchantId,
            newStatus
        );

    // 6. Validate HTTP status
    expect(
        updateResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    // 7. Validate response statusCode
    expect(
        updateResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    // 8. Validate updated merchant
    expect(
        updateResponse.body.data.userId
    ).toBe(
        merchantId
    );

    expect(
        updateResponse.body.data.status
    ).toBe(
        newStatus
    );
});