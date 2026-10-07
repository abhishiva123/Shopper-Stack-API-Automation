
import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';
import { createMerchantData } from '../../src/utils/test-data';

test('Create and update merchant', async ({
    merchantService,
    authService
}) => {

    // Create merchant
    const merchantData = createMerchantData();

    const createResponse = await merchantService.createMerchant(
        merchantData
    );

    expect(createResponse.response.status()).toBe(
        STATUS_CODES.CREATED
    );

    // Get the ID of the created merchant
    const merchantId = createResponse.data.data.userId;

    // Login
    await authService.login(
        merchantData.email,
        merchantData.password,
        'MERCHANT'
    );

    // Full PUT request body
    const updatedMerchantData = {
        city: merchantData.city,
        commission: merchantData.commission,

        company: {
            address: {
                addressId: 0,
                buildingInfo: merchantData.company.address.buildingInfo,
                city: merchantData.company.address.city,
                country: merchantData.company.address.country,
                landmark: merchantData.company.address.landmark,
                name: merchantData.company.address.name,
                phone: merchantData.company.address.phone,
                pincode: merchantData.company.address.pincode,
                state: merchantData.company.address.state,
                streetInfo: merchantData.company.address.streetInfo,
                type: merchantData.company.address.type
            },

            companyId: 0,
            email: merchantData.company.email,
            gstn: merchantData.company.gstn,
            name: merchantData.company.name,
            phone: merchantData.company.phone,
            registerNumber: merchantData.company.registerNumber,
            webAddress: merchantData.company.webAddress
        },

        country: merchantData.country,
        createdDateTime: new Date().toISOString(),
        dob: '',
        email: merchantData.email,
        firstName: merchantData.firstName,
        gender: merchantData.gender,
        imageId: '',
        jwtToken: '',
        lastName: merchantData.lastName,
        password: merchantData.password,
        phone: merchantData.phone,
        productAdded: 0,
        productLimit: merchantData.productLimit,
        role: 'MERCHANT',
        state: merchantData.state,
        status: 'ACTIVE',
        token: '',
        zoneId: merchantData.zoneId
    };

    // Update the created merchant
    const response = await merchantService.updateMerchant(
        merchantId,
        updatedMerchantData
    );

    console.log(
        'PUT Status:',
        response.status()
    );

    console.log(
        'PUT Response:',
        await response.text()
    );
});
