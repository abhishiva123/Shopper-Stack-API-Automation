import { z } from 'zod';

export const shopperLikesResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.record(
        z.string(),
        z.array(z.string())
    )
});