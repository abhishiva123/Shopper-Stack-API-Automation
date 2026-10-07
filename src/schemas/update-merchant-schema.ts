import { z } from 'zod';

const addressSchema = z.object({
    addressId: z.number(),
    buildingInfo: z.string(),
    city: z.string(),
    country: z.string(),
    landmark: z.string(),
    name: z.string(),
    phone: z.string(),
    pincode: z.string(),
    state: z.string(),
    streetInfo: z.string(),
    type: z.string()
});

const companySchema = z.object({
    address: addressSchema,
    companyId: z.number(),
    email: z.string(),
    gstn: z.string(),
    name: z.string(),
    phone: z.string(),
    registerNumber: z.string(),
    webAddress: z.string()
});

const merchantSchema = z.object({
    city: z.string(),
    commission: z.number(),
    company: companySchema,
    country: z.string(),
    createdDateTime: z.string(),
    dob: z.string(),
    email: z.string(),
    firstName: z.string(),
    gender: z.string(),
    imageId: z.string(),
    jwtToken: z.string(),
    lastName: z.string(),
    password: z.string(),
    phone: z.string(),
    productAdded: z.number(),
    productLimit: z.number(),
    role: z.string(),
    state: z.string(),
    status: z.string(),
    token: z.string(),
    zoneId: z.string()
});

export const updateMerchantResponseSchema = z.object({
    data: merchantSchema,
    message: z.string(),
    statusCode: z.number()
});