import { z } from 'zod';

const orderItemSchema = z.object({
    productId: z.number(),
    quantity: z.number()
});

export const shopperOrderSchema = z.object({
    actualPrice: z.number().optional().nullable(),

    address: z.object({
        addressId: z.number().optional().nullable(),
        buildingInfo: z.string(),
        city: z.string(),
        country: z.string(),
        landmark: z.string(),
        name: z.string(),
        phone: z.string(),
        pincode: z.string(),
        state: z.string(),
        streetInfo: z.string(),
        type: z.string()
    }).optional().nullable(),

    deliveredDate: z.string().optional().nullable(),

    discountPrice: z.number().optional().nullable(),

    lastModifiedDate: z.string().optional().nullable(),

    orderDate: z.string().optional().nullable(),

    orderId: z.number(),

    orderStatus: z.enum([
        'IN_TRANSIT',
        'PLACED',
        'CANCELLED',
        'DISPATCHED',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
        'REJECTED'
    ]),

    orderedItems: z.array(orderItemSchema),

    paymentMode: z.enum([
        'COD',
        'NET_BANKING',
        'CREDIT_CARD',
        'DEBIT_CARD'
    ]),

    shopperId: z.number(),

    totalPrice: z.number().optional().nullable(),

    transactionId: z.number().optional().nullable()
});

export type ShopperOrder =
    z.infer<typeof shopperOrderSchema>;

export const shopperOrdersResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.array(shopperOrderSchema)
});

export const shopperOrderResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: shopperOrderSchema
});