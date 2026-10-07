import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createAdminData } from '../../src/utils/test-data';

test('Get merchants by status and zone', async ({
    adminService,
    authService
}) => {

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

    const status = 'BLOCKED';
    const zoneId = 'ALPHA';

    const getResponse =
        await adminService.getMerchantsByStatus(
            status,
            zoneId
        );

    expect(
        getResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        getResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        Array.isArray(
            getResponse.body.data
        )
    ).toBe(
        true
    );

    for (
        const merchant of getResponse.body.data
    ) {
        expect(
            merchant.role
        ).toBe(
            'MERCHANT'
        );

        expect(
            merchant.status
        ).toBe(
            status
        );

        expect(
            merchant.zoneId
        ).toBe(
            zoneId
        );
    }
});