import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createAdminData } from '../../src/utils/test-data';
import { faker } from '@faker-js/faker';

test('Update admin by ID', async ({
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

    // 3. Prepare complete User request body
    const updatedAdminData = {
        city: faker.location.city(),
        country: adminData.country,
        createdDateTime: null,
        dob: null,
        email: adminData.email,
        firstName: faker.person.firstName(),
        gender: adminData.gender,
        imageId: null,
        jwtToken: null,
        lastName: faker.person.lastName(),
        password: adminData.password,
        phone: `9${faker.string.numeric(9)}`,
        role: 'ADMIN',
        state: adminData.state,
        status: 'ACTIVE',
        token: null,
        zoneId: null
    };

    // 4. Update admin
    const updateResponse =
        await adminService.updateAdmin(
            adminId,
            updatedAdminData
        );

    // 5. Validate HTTP status
    expect(
        updateResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    // 6. Validate API statusCode
    expect(
        updateResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    // 7. Validate updated admin data
    expect(
        updateResponse.body.data.userId
    ).toBe(
        adminId
    );

    expect(
        updateResponse.body.data.email
    ).toBe(
        updatedAdminData.email
    );

    expect(
        updateResponse.body.data.firstName
    ).toBe(
        updatedAdminData.firstName
    );

    expect(
        updateResponse.body.data.lastName
    ).toBe(
        updatedAdminData.lastName
    );

    expect(
        updateResponse.body.data.role
    ).toBe(
        'ADMIN'
    );

    expect(
        updateResponse.body.data.status
    ).toBe(
        'ACTIVE'
    );

    // 8. API retains the original city
    expect(
        updateResponse.body.data.city
    ).toBe(
        adminData.city
    );
});