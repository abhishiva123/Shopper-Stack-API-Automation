import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createAdminData } from '../../src/utils/test-data';

test('Register admin', async ({
    adminService
}) => {

    // 1. Generate admin data
    const adminData =
        createAdminData();

    // 2. Create admin
    const createResponse =
        await adminService.createAdmin(
            adminData
        );

    // 3. Validate HTTP status
    expect(
        createResponse.response.status()
    ).toBe(
        STATUS_CODES.CREATED
    );

    // 4. Validate API statusCode
    expect(
        createResponse.body.statusCode
    ).toBe(
        STATUS_CODES.CREATED
    );

    // 5. Validate admin was created
    expect(
        createResponse.body.data.userId
    ).toBeTruthy();

    // 6. Validate returned email
    expect(
        createResponse.body.data.email
    ).toBe(
        adminData.email
    );

    // 7. Validate role
    expect(
        createResponse.body.data.role
    ).toBe(
        'ADMIN'
    );

    // 8. Validate status
    expect(
        createResponse.body.data.status
    ).toBe(
        'ACTIVE'
    );
});