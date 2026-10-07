import { z } from 'zod';

export function validateResponse<T>(
    schema: z.ZodType<T>,
    responseBody: unknown
): T {
    const validatedResponse = schema.parse(responseBody);

    console.log('✅ Response schema validation passed');

    return validatedResponse;
}