import { z } from 'zod';

const wishlistItemSchema = z.object({
    itemId: z.number(),
    productId: z.number(),
    quantity: z.number(),
    productName: z.string(),
    imageLink: z.string(),
    price: z.number(),
    productLink: z.string()
});

export const addWishlistResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: wishlistItemSchema
});
export type WishlistItem =
    z.infer<typeof wishlistItemSchema>;