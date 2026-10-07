import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createAdminData } from '../../src/utils/test-data';

test('Get admin by ID', async ({
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

    const adminId =
        createResponse.body.data.userId;

    expect(
        adminId
    ).toBeTruthy();


    // 2. Login as admin
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


    // 3. Get admin by ID
    const getResponse =
        await adminService.getAdminById(
            adminId
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


    // 6. Validate admin ID
    expect(
        getResponse.body.data.userId
    ).toBe(
        adminId
    );


    // 7. Validate email
    expect(
        getResponse.body.data.email
    ).toBe(
        adminData.email
    );


    // 8. Validate role
    expect(
        getResponse.body.data.role
    ).toBe(
        'ADMIN'
    );


    // 9. Validate status
    expect(
        getResponse.body.data.status
    ).toBe(
        'ACTIVE'
    );
});