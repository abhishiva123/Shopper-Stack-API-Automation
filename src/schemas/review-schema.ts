import { z } from 'zod';

export const reviewSchema = z.object({
    reviewId: z.number(),
    shopperId: z.number(),
    shopperName: z.string(),
    heading: z.string(),
    description: z.string(),
    rating: z.number(),
    dateTime: z.string()
});

export type Review = z.infer<typeof reviewSchema>;

export const reviewResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: reviewSchema
});

export const reviewsResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.array(reviewSchema)
});

export const deleteReviewResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.string()
});