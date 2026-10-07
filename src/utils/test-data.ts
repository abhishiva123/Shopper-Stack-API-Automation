import { faker } from '@faker-js/faker';

export function createShopperData() {
    return {
        city: faker.location.city(),
        country: 'India',
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        gender: 'MALE',
        lastName: faker.person.lastName(),
        password: faker.internet.password({ length: 12 }),
        phone: `9${faker.string.numeric(9)}`,
        state: 'Karnataka',
        zoneId: "ALPHA"
    };

}

export function createMerchantData() {
    return {
        city: faker.location.city(),
        commission: 25,

        company: {
            address: {
                buildingInfo: faker.location.buildingNumber(),
                city: faker.location.city(),
                country: 'India',
                landmark: faker.location.streetAddress(),
                name: faker.person.fullName(),
                phone: `9${faker.string.numeric(9)}`,
                pincode: faker.string.numeric(6),
                state: 'Karnataka',
                streetInfo: faker.location.streetAddress(),
                type: 'HOME'
            },
            email: faker.internet.email(),
            gstn: faker.string.alphanumeric(15).toUpperCase(),
            name: faker.company.name(),
            phone: `9${faker.string.numeric(9)}`,
            registerNumber: faker.string.alphanumeric(10).toUpperCase(),
            webAddress: 'https://example.com'
        },

        country: 'India',
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        gender: 'MALE',
        lastName: faker.person.lastName(),
        password: faker.internet.password({ length: 12 }),
        phone: `9${faker.string.numeric(9)}`,
        productLimit: 10,
        state: 'Karnataka',
        zoneId: 'ALPHA'
    };
}


export function
    createUpdatedMerchantData() {
    return {
        city: faker.location.city(),
        commission: 25,

        company: {
            address: {
                addressId: 0,
                buildingInfo: faker.location.buildingNumber(),
                city: faker.location.city(),
                country: 'India',
                landmark: faker.location.streetAddress(),
                name: faker.person.fullName(),
                phone: `9${faker.string.numeric(9)}`,
                pincode: faker.string.numeric(6),
                state: 'Karnataka',
                streetInfo: faker.location.streetAddress(),
                type: 'HOME'
            },

            companyId: 0,
            email: faker.internet.email(),
            gstn: faker.string.alphanumeric(15).toUpperCase(),
            name: faker.company.name(),
            phone: `9${faker.string.numeric(9)}`,
            registerNumber: faker.string.alphanumeric(10).toUpperCase(),
            webAddress: 'https://example.com'
        },

        country: 'India',
        createdDateTime: new Date().toISOString(),
        dob: '',
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        gender: 'MALE',
        imageId: '',
        jwtToken: '',
        lastName: faker.person.lastName(),
        password: faker.internet.password({ length: 12 }),
        phone: `9${faker.string.numeric(9)}`,
        productAdded: 0,
        productLimit: 10,
        role: 'MERCHANT',
        state: 'Karnataka',
        status: 'ACTIVE',
        token: '',
        zoneId: 'ALPHA'
    };
}

export function createAddressData() {
    return {
        buildingInfo: faker.location.buildingNumber(),
        city: faker.location.city(),
        country: 'India',
        landmark: faker.location.streetAddress(),
        name: faker.person.fullName(),
        phone: `9${faker.string.numeric(9)}`,
        pincode: faker.helpers.arrayElement([
            '432101',
            '432102',
            '432103',
            '432104',
            '432105',
            '432106',
            '560010'
        ]),
        state: 'Karnataka',
        streetInfo: faker.location.streetAddress(),
        type: 'HOME'
    };
}

export function createItemData(
    productId: number,
    quantity = 1
) {
    return {
        productId,
        quantity
    };
}
export function createOrderData(
    address: unknown,
    paymentMode: string = 'COD'
) {
    return {
        address,
        paymentMode
    };
}

export function createReviewData(
    shopperId: number,
    shopperName: string
) {
    return {
        shopperId,
        shopperName,
        heading: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        rating: 5
    };


}

export function createAdminData() {
    return {
        city: faker.location.city(),
        country: 'India',
        email: faker.internet.email(),
        gender: 'MALE',
        password: faker.internet.password({
            length: 12
        }),
        state: 'Karnataka',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: `9${faker.string.numeric(9)}`
    };
}

