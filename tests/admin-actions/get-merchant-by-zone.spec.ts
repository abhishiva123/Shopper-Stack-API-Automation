import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createAdminData } from '../../src/utils/test-data';

test('Get merchants by zone', async ({
    adminService,
    authService
}) => {

    // 1. Create admin
    const adminData =
        createAdminData();

    const createResponse =
        await adminService.createAdmin(
            adminData
        );

    expect(
        createResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    // 2. Login as ADMIN
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

    // 3. Get merchants by zone
    const zoneId = 'ALPHA';

    const getResponse =
        await adminService.getMerchantsByZone(
            zoneId
        );

    // 4. Validate HTTP status
    expect(
        getResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    // 5. Validate API statusCode
    expect(
        getResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    // 6. Validate response data
    expect(
        Array.isArray(
            getResponse.body.data
        )
    ).toBe(
        true
    );

    // 7. Validate merchants
    for (
        const merchant of getResponse.body.data
    ) {

        expect(
            merchant.role
        ).toBe(
            'MERCHANT'
        );

        expect(
            merchant.zoneId
        ).toBe(
            zoneId
        );
    }
});