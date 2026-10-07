import { z } from 'zod';

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

export const createAddressResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: addressSchema
});

export const addressListResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.array(addressSchema)
});

export const addressByIdResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: addressSchema
});

export type Address = z.infer<typeof addressSchema>;