import { z } from 'zod';

export const merchantByIdResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),

    data: z.object({
        userId: z.number(),
        email: z.string(),
        role: z.string(),
        status: z.string(),
        createdDateTime: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        zoneId: z.string(),
        imageId: z.null(),
        jwtToken: z.null()
    })
});