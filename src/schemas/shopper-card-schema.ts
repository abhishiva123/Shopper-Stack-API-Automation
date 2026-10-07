import { z } from 'zod';

const shopperCardSchema = z.object({
    id: z.number(),
    number: z.string(),
    cvv: z.string(),
    nameOnCard: z.string(),
    expiryDate: z.string(),
    type: z.string(),
    userId: z.number()
});

const cardSchema = z.object({
    cardId: z.number(),
    shopperId: z.number(),
    email: z.string(),
    number: z.string(),
    cardType: z.string(),
    cvv: z.number(),
    pin: z.number(),
    expiryDate: z.string(),
    nameOnCard: z.string(),
    bankName: z.string(),
    balance: z.number()
});

export const saveShopperCardResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: shopperCardSchema
});

export const getShopperCardsResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.array(shopperCardSchema)
});

export const getAllShopperCardsResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.array(cardSchema)
});

export const deleteShopperCardResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.string()
});