import { z } from 'zod';

const reviewSchema = z.object({
    reviewId: z.number(),
    shopperId: z.number(),
    shopperName: z.string(),
    heading: z.string().nullable(),
    description: z.string(),
    rating: z.number(),
    dateTime: z.string()
});

export const productSchema = z.object({
    productId: z.number(),
    name: z.string().nullable(),
    title: z.string(),
    description: z.string(),
    rating: z.number(),
    price: z.number(),
    offer: z.number(),
    type: z.string(),
    brand: z.string(),
    category: z.string(),
    merchantId: z.number(),
    quantity: z.number(),
    status: z.string(),
    thumbnailURL: z.string().nullable(),
    productImageURLs: z.array(z.string()).nullable(),
    searchTags: z.array(z.string()).nullable(),
    reviews: z.array(reviewSchema).nullable(),
    createdDateTime: z.string().nullable(),
    zoneId: z.string()
});

export const productResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.array(productSchema)
});

export type ProductResponse = z.infer<typeof productResponseSchema>;