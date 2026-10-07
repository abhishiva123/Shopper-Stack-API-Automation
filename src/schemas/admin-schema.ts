import { z } from 'zod';

export const createAdminResponseSchema =
    z.object({
        statusCode: z.number(),
        message: z.string(),
        data: z.object({
            userId: z.number(),
            email: z.string(),
            role: z.string(),
            status: z.string(),
            createdDateTime: z.string().nullable(),
            firstName: z.string(),
            lastName: z.string(),
            city: z.string(),
            state: z.string(),
            country: z.string(),
            zoneId: z.string(),
            imageId: z.string().nullable(),
            jwtToken: z.string().nullable()
        })
    });

export const getAdminResponseSchema =
    z.object({
        statusCode: z.number(),
        message: z.string(),
        data: z.object({
            userId: z.number(),
            city: z.string(),
            country: z.string(),
            createdDateTime: z.string().nullable(),
            dob: z.string().nullable(),
            email: z.string(),
            firstName: z.string(),
            gender: z.string(),
            imageId: z.string().nullable(),
            jwtToken: z.string().nullable(),
            lastName: z.string(),
            password: z.string().nullable(),
            phone: z.string(),
            role: z.string(),
            state: z.string(),
            status: z.string(),
            token: z.string().nullable(),
            zoneId: z.string()
        })
    });

export const adminMerchantAddressSchema =
    z.object({
        addressId: z.number(),
        buildingInfo: z.string().nullable(),
        city: z.string(),
        country: z.string(),
        landmark: z.string().nullable(),
        name: z.string().nullable(),
        phone: z.string().nullable(),
        pincode: z.string(),
        state: z.string(),
        streetInfo: z.string().nullable(),
        type: z.string().nullable()
    });

export const adminMerchantCompanySchema =
    z.object({
        companyId: z.number(),
        name: z.string(),
        gstn: z.string(),
        address: adminMerchantAddressSchema,
        registerNumber: z.string(),
        phone: z.string(),
        webAddress: z.string().nullable(),
        email: z.string()
    });

export const adminMerchantSchema =
    z.object({
        userId: z.number(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string().nullable(),
        password: z.string().nullable(),
        role: z.string(),
        gender: z.string(),
        status: z.string(),
        token: z.string().nullable(),
        dob: z.string().nullable(),
        createdDateTime: z.string().nullable(),
        zoneId: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        imageId: z.string().nullable(),
        commission: z.number(),
        productLimit: z.number(),
        company: adminMerchantCompanySchema,
        productAdded: z.number(),
        jwtToken: z.string().nullable()
    });

    export const adminMerchantListResponseSchema =
    z.object({
        statusCode: z.number(),
        message: z.string(),
        data: z.array(adminMerchantSchema)
    });

export const merchantStatusResponseSchema =
    z.object({
        statusCode: z.number(),
        message: z.string(),
        data: z.object({
            userId: z.number(),
            email: z.string(),
            role: z.string(),
            status: z.string(),
            createdDateTime: z.string().nullable(),
            firstName: z.string(),
            lastName: z.string(),
            city: z.string(),
            state: z.string(),
            country: z.string(),
            zoneId: z.string(),
            imageId: z.string().nullable(),
            jwtToken: z.string().nullable()
        })
    });

    export type AdminMerchant =
    z.infer<typeof adminMerchantSchema>;