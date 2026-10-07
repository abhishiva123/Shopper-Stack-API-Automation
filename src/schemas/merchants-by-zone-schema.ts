import { z } from 'zod';

const addressSchema = z.object({
  addressId: z.number(),
  name: z.string().nullable(),
  type: z.string().nullable(),
  buildingInfo: z.string().nullable(),
  streetInfo: z.string().nullable(),
  landmark: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  pincode: z.string().nullable(),
  phone: z.string().nullable()
});

const companySchema = z.object({
  companyId: z.number(),
  name: z.string().nullable(),
  gstn: z.string().nullable(),
  address: addressSchema,
  registerNumber: z.string().nullable(),
  phone: z.string().nullable(),
  webAddress: z.string().nullable(),
  email: z.string().nullable()
});

const merchantSchema = z.object({
  userId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  password: z.null(),
  role: z.string(),
  gender: z.string(),
  status: z.string(),
  token: z.string().nullable(),
  dob: z.string().nullable(),
  createdDateTime: z.string().nullable(),
  zoneId: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  imageId: z.string().nullable(),
  commission: z.number(),
  productLimit: z.number(),
  company: companySchema,
  productAdded: z.number(),
  jwtToken: z.string().nullable()
});

export const merchantsByZoneResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: z.array(merchantSchema)
});