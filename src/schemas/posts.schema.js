import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(10, 'El título es obligatorio y debe tener al menos 10 caracteres'),
  content: z.string().min(15, 'La descripción es obligatorio y debe tener al menos 15 caracteres'),
  category: z.union([z.string(), z.number()]).refine(val => String(val).length > 0, {
    message: 'Debe seleccionar una categoría',
  }),
  image: z.any().optional(), 
})

export const updatePostSchema = createPostSchema.partial()
