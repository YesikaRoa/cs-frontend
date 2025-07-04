import { z } from 'zod'

export const aboutSchema = z.object({
  mission: z.string().min(40, 'La misión debe tener al menos 40 caracteres'),
  vision: z.string().min(40, 'La visión debe tener al menos 40 caracteres'),
  about: z.string().min(40, 'La descripción de quiénes somos debe tener al menos 40 caracteres'),
})

export const aboutSectionSchema = z.object({
  value: z.string().min(40, 'El texto debe tener al menos 40 caracteres'),
})
