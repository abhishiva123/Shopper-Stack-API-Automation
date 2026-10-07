import { z } from 'zod';

export const loginResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),

  data: z.object({
    userId: z.number(),
    email: z.string(),
    role: z.string(),
    status: z.string(),
    createdDateTime: z.null(),
    firstName: z.string(),
    lastName: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zoneId: z.string(),
    imageId: z.null(),
    jwtToken: z.string()
  })
});

export const forgotPasswordResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.record(
        z.string(),
        z.string()
    )
});

export const resetPasswordResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.string()
});