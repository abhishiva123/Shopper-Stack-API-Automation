import { z } from 'zod';

const cartItemSchema = z.object({
    itemId: z.number(),
    productId: z.number(),
    quantity: z.number(),
    productName: z.string(),
    imageLink: z.string(),
    price: z.number(),
    productLink: z.string()
});

export const cartResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.array(cartItemSchema).nullable()
});

export const cartItemResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: cartItemSchema
});

export const deleteCartResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.array(cartItemSchema).nullable()
});
export type CartItem = z.infer<typeof cartItemSchema>;