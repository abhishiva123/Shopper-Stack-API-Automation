import { z } from 'zod';
import { productSchema } from './product-schema';

const addressSchema = z.object({
    addressId: z.number(),
    name: z.string(),
    type: z.string(),
    buildingInfo: z.string(),
    streetInfo: z.string(),
    landmark: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pincode: z.string(),
    phone: z.string()
});

const companySchema = z.object({
    companyId: z.number(),
    name: z.string(),
    gstn: z.string(),
    address: addressSchema,
    registerNumber: z.string(),
    phone: z.string(),
    webAddress: z.string(),
    email: z.string()
});

const merchantSchema = z.object({
    userId: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),

    password: z.null(),

    role: z.string(),
    gender: z.string(),
    status: z.string(),

    token: z.null(),
    dob: z.null(),

    createdDateTime: z.string(),

    zoneId: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),

    imageId: z.null(),

    commission: z.number(),
    productLimit: z.number(),

    company: companySchema,

    productAdded: z.number(),

    jwtToken: z.null()
});

export const productByIdResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: productSchema
});