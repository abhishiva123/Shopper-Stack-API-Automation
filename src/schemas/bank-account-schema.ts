import { z } from 'zod';

const bankAccountSchema = z.object({
    bankAccountId: z.number(),
    bankAccountNumber: z.string(),
    bankName: z.string(),
    shopperId: z.number(),
    email: z.string(),
    password: z.string(),
    balance: z.number()
});

export const createBankAccountResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: bankAccountSchema
});

export const getBankAccountsResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.array(bankAccountSchema)
});
export const updateBankAccountResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: bankAccountSchema
});
export const loginBankAccountResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: bankAccountSchema
});